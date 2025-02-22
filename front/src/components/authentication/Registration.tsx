import { useForm } from "react-hook-form";
import { useDataContext } from "../contexts/DataContext";
import { useNavigate } from "react-router";
import ErrorServer from "../messages/ErrorServer";

interface UserData {
  name: string;
  email: string;
  password: string;
  userPosition: string;
}

type RegistrationInputs = {
  name: string;
  email: string;
  password: string;
  userPosition: string;
};

const Registration = () => {
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<RegistrationInputs>();
  const { url, setIsLoading, setError } = useDataContext();
  const navigate = useNavigate();

  const postUserData = async (data: UserData) => {
    setIsLoading(true);
    try {
      const changedData = {
        ...data,
        email: data.email.toLocaleLowerCase(),
      };
      const response = await fetch(`${url}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(changedData),
      });
        switch (response.status) {
            case 401: 
            setError("Unauthorized")
            break;
            case 400:
                setError("Bad Request")
        }

      if (!response.ok) {
        setTimeout(() => {
          setError("");
        }, 2500);
        return;
      }
         await response.json();
      reset();
      setTimeout(() => {
        navigate("/login")
      },1200)
    } catch (error) {
      setError(error);
      setTimeout(() => {
        setError("");
      }, 2500);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    <ErrorServer/>
      <div className="flex flex-col justify-center items-center min-h-screen">
        <form onSubmit={handleSubmit(postUserData)} className="pt-5 flex items-center flex-col phone:w-[20rem] tablet:w-[25rem] desktop:w-[30rem]  bg-white rounded-2xl">
          <p className="text-3xl font-semibold ">
            Registration
          </p>
          <label className="tomas-label inter">Name: </label>
          <input
            className="tomas-input"
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
          {errors && <p className="text-sm inter text-red-500">{errors.name?.message}</p>}
          <label className="tomas-label inter">Email: </label>
          <input
            className="tomas-input"
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
          {errors && <p className="text-sm inter text-red-500">{errors.email?.message}</p>}
          <label className="tomas-label inter">Password: </label>
          <input
            className="tomas-input"
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
          {errors && <p className="text-sm inter text-red-500 text-center">{errors.password?.message}</p>}
          <label className="tomas-label inter">Choose what you are looking for:</label>
          <select defaultValue="" className="inter tomas-select cursor-pointer " {...register("userPosition", {
            required:"Type is required"
          })}>
            <option className="text-center" disabled value="">Type</option>
            <option value="JOBSEEKER">Looking For Work</option>
            <option value="COMPANY">Looking For Workers</option>
          </select>
          {errors && <p className="text-sm inter text-red-500 text-center">{errors.userPosition?.message}</p>}
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
