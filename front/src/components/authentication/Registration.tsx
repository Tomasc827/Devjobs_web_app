import { useForm } from "react-hook-form";
import { useDataContext } from "../contexts/DataContext";
import { useNavigate } from "react-router";

interface UserData {
  name: string;
  email: string;
  password: string;
  userPosition: string;
  avatar?: File;
}

type RegistrationInputs = UserData;


const Registration = () => {
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<RegistrationInputs>();
  const { url, setisLoading, timeoutForError,isDarkMode,timeoutForSuccess } = useDataContext();
  const navigate = useNavigate();

  const postUserData = async (data: UserData) => {
    setisLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email.toLowerCase());
      formData.append('password', data.password);
      formData.append('userPosition', data.userPosition);
      if (data.avatar?.[0]) {
        formData.append('avatar', data.avatar[0]);
      }

      const response = await fetch(`${url}/api/users/register`, {
        method: "POST",
        body: formData,
      });
        switch (response.status) {
            case 401: 
            timeoutForError("Unauthorized")
            return;
            case 400:
                timeoutForError("Bad Request")
                return;
        }

         await response.json();
      reset();
      timeoutForSuccess("Successfully registered")
      setTimeout(() => {
        navigate("/login")
      },1200)
    } catch (error) {
      timeoutForError(error);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen pt-[5%]">
        <form onSubmit={handleSubmit(postUserData)} className={`pt-5 flex items-center flex-col phone:w-[20rem] tablet:w-[25rem] desktop:w-[30rem]   rounded-2xl  ${isDarkMode ? "dark-card-color text-white duration-500" : "bg-white text-black duration-500"}`}>
          <p className="text-3xl font-semibold ">
            Registration
          </p>
          <label className="tomas-label outfit">Name: </label>
          <input
            className={`tomas-input ${isDarkMode ? "placeholder:text-white/50 duration-500 " : "placeholder:text-gray-500 duration-500"}`}
            type="text"
            placeholder="ex: Johnny Bravo"
            {...register("name", {
              required: "Name is required",
              pattern: {
                value: /^[a-zA-Z0-9 ]{3,255}$/,
                message:
                  "Name must be 3 to 255 characters long, only allows spaces, letters and numbers",
              },
            })}
          ></input>
          {errors && <p className="text-sm outfit text-red-500">{errors.name?.message}</p>}
          <label className="tomas-label outfit">Email: </label>
          <input
            className={`tomas-input ${isDarkMode ? "placeholder:text-white/50 duration-500 " : "placeholder:text-gray-500 duration-500"}`}
            type="text"
            placeholder="ex: Johnny@Bravo.com"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value:
                  /^[a-zA-Z0-9%+-]+(\.[a-zA-Z0-9%+-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,255}$/,

                message: "Invalid email format",
              },
            })}
          ></input>
          {errors && <p className="text-sm outfit text-red-500">{errors.email?.message}</p>}
          <label className="tomas-label outfit">Password: </label>
          <input
           className={`tomas-input ${isDarkMode ? "placeholder:text-white/50 duration-500" : "placeholder:text-gray-500 duration-500"}`}
            type="password"
            placeholder="ex: *******"
            {...register("password", {
              required: "Can't be empty",
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;"'<>,.?/\\|`~\-]).{8,50}$/,
                message:
                  "Password must contain at least one uppercase letter, one lowercase letter, one number,one special symbol and be from 8 to 50 characters long",
              },
            })}
          ></input>
          {errors && <p className="text-sm outfit text-red-500 text-center">{errors.password?.message}</p>}
          <label className="tomas-label outfit">Choose what you are looking for:</label>
          <select defaultValue="" className={`outfit tomas-select cursor-pointer ${isDarkMode ? "dark-card-color" : "text-gray-500"}`} {...register("userPosition", {
            required:"Type is required"
          })}>
            <option className={`text-center ${isDarkMode ? "" : "text-gray-500"}`} disabled value="">Choose From Dropdown</option>
            <option value="JOBSEEKER" className="hover:bg-red-500">Looking For Work</option>
            <option value="COMPANY">Looking For Workers</option>
          </select>
          {errors && <p className="text-sm outfit text-red-500 text-center">{errors.userPosition?.message}</p>}
          <label className="tomas-label outfit">Avatar: </label>
          <input
            type="file"
            accept="image/*"
            className={`custom-file-input tomas-input duration-500 mb-10 ${isDarkMode ? " opacity-50" : ""}`}
            {...register("avatar", {
              validate: {
                fileSize: (files) => {
                  if (files?.[0]) {
                    const size = files[0].size / 1024 / 1024; 
                    return size <= 5 || "File size must be less than 5MB";
                  }
                  return true;
                },
                fileType: (files) => {
                  if (files?.[0]) {
                    const type = files[0].type;
                    return (
                      ["image/jpeg", "image/png", "image/gif"].includes(type) ||
                      "Only JPEG, PNG and GIF images are allowed"
                    );
                  }
                  return true;
                },
              },
            })}
          />
          {errors && <p className="text-sm outfit text-red-500">{errors.avatar?.message}</p>}
          <div>
          <button className="tomas-button me-10" type="submit">Submit</button>
          <button className="tomas-button mb-5" onClick={() => navigate(-1)}>Go Back</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Registration;
