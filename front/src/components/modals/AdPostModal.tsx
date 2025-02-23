import { useForm } from "react-hook-form";
import { useDataContext } from "../contexts/DataContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

interface PropsModal {
    setIsModalOpen: (value:boolean) => void;
}

interface JobAd {
    position:string;
    employmentType:string;
    location:string;
}

type PostFormInputs = {
    position: string,
    employmentType: string,
    location: string,
}


const AdPostModal: React.FC<PropsModal> = ({setIsModalOpen}) => {
    const {handleSubmit, formState:{errors}, reset, register} = useForm<PostFormInputs>();
    const {isDarkMode,setisLoading,url,timeoutForError,timeoutForSuccess,setUpdateHomepage} = useDataContext();
    const [locations,setLocations] = useState<string[]>([])
    
        const getAllLocations = async () => {
            setisLoading(true);
            try{
                const response = await fetch(`${url}/api/jobs/locations`, {
                    method:"GET",
                    headers:{
                        "Content-Type": "application/json"
                    }
                })
                const locationData: string[] = await response.json();
                setLocations(locationData);
            } catch (error) {
                timeoutForError(error)
            }finally {
                setisLoading(false);
            }
        }

    const postJobAd = async (data:JobAd) => {
        setisLoading(true);
        try {
            const updatedData = {
              ...data,
              location: data.location.split(" ").join("_").toUpperCase()
            }

            const response = await fetch(`${url}/api/jobs/add`, {
                method:"POST",
                headers: {
                    "Authorization": `bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedData)
            })
            if (response.ok) {
                await response.json();
                timeoutForSuccess("Job posted successfully")
                setTimeout(() => {
                    setIsModalOpen(false);
                    setUpdateHomepage(prev => prev + 1)
                },1000)
            } else {
                switch (response.status) {
                    case 401: timeoutForError("Unauthenticated")
                    break;
                    case 403: timeoutForError("Unauthorized")
                    break;
                    case 400: timeoutForError("Bad Request, adjust inputs")
                }
            }
        } catch (error) {
            timeoutForError(error)
        } finally {
            setisLoading(false);
        }
    }

    useEffect(() => {
      getAllLocations()
    },[])

    return ( 
    <>
    <div className="fixed flex justify-center items-center bg-black/30 min-h-screen min-w-screen z-40">
    <form onSubmit={handleSubmit(postJobAd)}  className={`pt-5 flex items-center flex-col phone:w-[20rem] tablet:w-[25rem] desktop:w-[30rem]   rounded-2xl  ${isDarkMode ? "dark-card-color text-white duration-500" : "bg-white text-black duration-500"}`}>
          <p className="text-3xl font-semibold text-center">
            Post a Job Advertisement
          </p>
          <label className="tomas-label outfit">Position: </label>
          <input
             className={`tomas-input ${isDarkMode ? "placeholder:text-white/50  duration-500" : "placeholder:text-gray-500 duration-500"}`}
            type="text"
            placeholder="ex: Software Engineer"
            {...register("position", {
              required: "Position is required",
              pattern: {
                value:
                  /^[a-zA-Z0-9 .,!&£$-]{2,255}$/,

                message: "Position includes only letters, numbers and symbols .,!£$-&",
              },
            })}
          ></input>
          {errors && <p className="text-sm outfit text-red-500">{errors.position?.message}</p>}
          <label className="tomas-label outfit">Location: </label>
          <select defaultValue="" className={`outfit tomas-select cursor-pointer mb-5 ${isDarkMode ? "dark-card-color" : "text-navy-color"}`} {...register("location", {
            required:"Location is required"
          })}>
             <option className={`text-center ${isDarkMode ? "" : "text-gray-500"}`} disabled value="">Choose a Location:</option>
            {locations.map((location,index) => (
              <option key={index} value={location} className="text-center font-semibold">{location}</option>
            ))}
          </select>
          {errors && <p className="text-sm outfit text-red-500">{errors.location?.message}</p>}
          <label className="tomas-label outfit">Employment Type:</label>
          <select defaultValue="" className={`outfit tomas-select cursor-pointer mb-5 ${isDarkMode ? "dark-card-color" : "text-navy-color"}`} {...register("employmentType", {
            required:"Type is required"
          })}>
            <option className={`text-center ${isDarkMode ? "" : "text-gray-500"}`} disabled value="">Choose From Dropdown</option>
            <option value="FULL_TIME" className="text-center font-semibold">Full Time</option>
            <option value="PART_TIME" className="text-center font-semibold">Part Time</option>
          </select>
          {errors && <p className="text-sm outfit text-red-500 text-center">{errors.employmentType?.message}</p>}
          <div>
          <button className="tomas-button me-10" type="submit">Post</button>
          <button className="tomas-button mb-5" onClick={() => {setIsModalOpen(false)
            reset();
          }}>Close</button>
          </div>
          </form>
    </div>
    </> );
}
 
export default AdPostModal;