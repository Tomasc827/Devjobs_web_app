import { useForm } from "react-hook-form";
import { useDataContext } from "../contexts/DataContext";
import SearchIcon from "../../svgs/SearchIcon";
import { useEffect, useState } from "react";
import LocationSvg from "../../svgs/LocationSvg";
import JobAds from "./JobAds";
import SearchIconMobile from "../../svgs/SearchIconMobile";
import FilterSvg from "../../svgs/FilterSvg";
import LocationSvgMobile from "../../svgs/LocationSvgMobile";
import { useNavigate } from "react-router";

interface JobAd {
  id: number;
  position: string;
  employmentType: string;
  location: string;
  localDateTime: string;
  companyName: string;
  userId: number;
}

interface JobResponse {
  content: JobAd[];
  totalPages: number;
  totalElements: number;
  last: boolean;
}

const SearchBar = () => {
  const { url, isDarkMode, setisLoading, timeoutForError } = useDataContext();
  const [locations, setLocations] = useState<string[]>([]);
  const [svg, setSvg] = useState<boolean>(true);
  const [locationParameter, setLocationParameter] = useState<string>("");
  const [jobs, setJobs] = useState<JobAd[]>([]);
  const [firstFetch, setFirstFetch] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);
  const [isLastPage, SetIsLastPage] = useState<boolean>(false);
  const [size, setSize] = useState<number>(4);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  const navigate = useNavigate()

  const handleLocationParameter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocationParameter(e.target.value);
  };

  const getAllLocations = async () => {
    setisLoading(true);
    try {
      const response = await fetch(`${url}/api/jobs/locations`, {
        method: "Get",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const locationData: string[] = await response.json();
      setLocations(locationData);
    } catch (error) {
      timeoutForError(error);
    } finally {
      setisLoading(false);
    }
  };

  const [employmentType, setEmploymentType] = useState<string>("");
  const [position, setPosition] = useState<string>("");

  const handlePosition = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPosition(e.target.value);
  };

  const fetchParameteredData = async (fetchSize:number) => {
    setisLoading(true);
    try {
      const search = locationParameter.split(" ").join("_").toLocaleUpperCase();
      const response = await fetch(
        `${url}/api/jobs/search?position=${position}&page=${page}&size=${fetchSize}&employmentType=${employmentType}&location=${search}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setFirstFetch(false);
      const jobsData: JobResponse = await response.json();
      setJobs(jobsData.content);
      SetIsLastPage(jobsData.last);
    } catch (error) {
      timeoutForError(error);
    } finally {
      setisLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSize(4);
    setPage(0);
    fetchParameteredData(4);
    setTimeout(() => {
        setPosition("");
        setLocationParameter("");
        setEmploymentType("");
    },100)
  }

  const handleLoadMore = () => {
const newSize = size + 4;
setSize(newSize)
fetchParameteredData(newSize)
  }

  useEffect(() => {
    getAllLocations();
      fetchParameteredData(4);

  }, []);

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setIsFilterOpen(false);
  },[navigate])

  return (
    <>
      <div
        className={`fixed bg-white w-[80%] mx-[10%] py-6 z-[30] rounded-md top-[13%] ${
          isDarkMode ? "dark-card-color" : ""
        }`}
      >
        <form
          onSubmit={handleSearch}
          className="grid tablet:grid-cols-[30%_25%_30%_15%] phone:grid-cols-[70%_15%_15%]"
        >
          <div className="relative font-bold ">
            {windowSize.width >= 768 && <SearchIcon />}
            <input
              onChange={handlePosition}
              value={position}
              placeholder={`${
                windowSize.width >= 1440
                  ? "Filter job advertisements by position..."
                  : "Filter by title..."
              }`}
              className={`relative w-[70%] phone:ms-5 tablet:ms-13 desktop:ms-20 py-1 px-2 placeholder:font-normal rounded-full focus:shadow-inner focus:shadow-purple-600 border-b-2 border-transparent duration-500 focus:border-purple-600 ${
                isDarkMode ? "text-blue-500" : "text-navy-color"
              }`}
            ></input>
          </div>
          {windowSize.width >= 768 ? (
            <>
              <div className="relative">
                {svg && locationParameter.length < 20 && (
                  <LocationSvg width={windowSize.width} />
                )}
                <select
                  onChange={handleLocationParameter}
                  value={locationParameter}
                  onFocus={() => setSvg(false)}
                  onBlur={() => setSvg(true)}
                  className={`outfit duration-500 w-[100%] text-center focus:border-b-purple-500 border-b-[2.5px] border-transparent  focus:border-purple-600 focus:shadow-inner focus:shadow-purple-500 focus:rounded-xl cursor-pointer border-l-1 border-l-gray-300 ${
                    isDarkMode
                      ? "dark-card-color text-blue-500"
                      : "text-navy-color"
                  }`}
                >
                  <option
                    className={`text-center ${
                      isDarkMode ? "" : "text-gray-500"
                    }`}
                    disabled
                    value=""
                  >
                    {windowSize.width <= 1000
                      ? "Location"
                      : "Filter by location..."}
                  </option>
                  {locations.map((location, index) => (
                    <option key={index} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-center items-center border-l-1 border-l-gray-300 ">
                <input
                checked={employmentType === "FULL_TIME"}
                  value="FULL_TIME"
                  type="checkbox"
                  onChange={(e) =>
                    setEmploymentType(e.target.checked ? "FULL_TIME" : "")
                  }
                  className={`
    appearance-none
    w-6 h-6 
    border-2
    
    rounded-sm
    cursor-pointer
    ${
      isDarkMode
        ? "bg-gray-600 border-transparent checked:bg-[#5964e0]"
        : "bg-white border-[#5964e0] checked:bg-[#5964e0]"
    }
    
    checked:before:content-['✓']
    checked:before:text-white
    checked:before:text-lg
        checked:before:leading-none   
    checked:before:flex           
    checked:before:items-center
    checked:before:justify-center
    transition-colors duration-500
  `}
                />
                <label
                  className={`  font-bold ms-5 text-gray-900 dark:text-gray-300 ${
                    isDarkMode ? "" : "text-navy-color"
                  }`}
                >
                  Full Time Only
                </label>
              </div>{" "}
            </>
          ) : (
            <p></p>
          )}
          {windowSize.width >= 768 ? (
            <div className="relative">
              <button
                type="submit"
                className={`tomas-button py-3 absolute top-[-25%] ${
                  windowSize.width <= 1000 ? "min-w-[3rem] p-2 ms-1" : ""
                }`}
              >
                Search
              </button>
            </div>
          ) : (
            <div className="relative">
              <button
              onClick={() => {setIsFilterOpen(false)
                setTimeout(() => {
                },100)
              }}
                type="submit"
                className={`tomas-button py-3 absolute left-[-60%] top-[-35%] min-w-[3rem] p-2 ms-1`}
              >
                <SearchIconMobile />
              </button>
            </div>
          )}
          {windowSize.width <= 768 && (
            <div className="relative">
              <button
              type="button"
                onClick={() => setIsFilterOpen((prev) => !prev)}
                className="cursor-pointer absolute top-[-2rem] right-[-7%]"
              >
                <FilterSvg />
              </button>
            </div>
          )}
          {isFilterOpen && <div className="w-[80%] mx-[10%] md:hidden z-40  absolute top-[5rem]  bg-[rgb(89,100,224)] shadow-lg shadow-purple-500 rounded-lg border-2 border-purple-600">
                            <div className="flex flex-col items-center py-4 space-y-4">
                                <p className="text-white font-bold">Filtering Options:</p>
                            <>
              <div className="relative">
              <LocationSvgMobile/>
                <select
                  onChange={handleLocationParameter}
                  value={locationParameter}
                  onFocus={() => setSvg(false)}
                  onBlur={() => setSvg(true)}
                  className={`outfit duration-500 w-[80%] mx-[10%] text-center focus:border-b-purple-500 border-b-[2.5px] border-transparent cursor-pointer flex justify-center focus:border-purple-600 focus:shadow-inner focus:shadow-purple-500 focus:rounded-xl  ${
                    isDarkMode
                      ? " text-white"
                      : "text-white"
                  }`}
                >
                  <option
                    className={`text-center ${
                      isDarkMode ? "" : "text-gray-500"
                    }`}
                    disabled
                    value=""
                  >
                    {windowSize.width <= 1000
                      ? "Location"
                      : "Filter by location..."}
                  </option>
                  {locations.map((location, index) => (
                    <option className="text-black absolute left-[100%]" key={index} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-center items-center relative">
                <input
                  value="FULL_TIME"
                  type="checkbox"
                  onChange={(e) =>
                    setEmploymentType(e.target.checked ? "FULL_TIME" : "")
                  }
                  className={`
    appearance-none
    w-6 h-6 
    border-2
    absolute
    left-[-60%]
    rounded-sm
    cursor-pointer
  bg-gray-600 border-transparent checked:bg-purple-600

    
    checked:before:content-['✓']
    checked:before:text-white
    checked:before:text-lg
        checked:before:leading-none   
    checked:before:flex           
    checked:before:items-center
    checked:before:justify-center
    transition-colors duration-500
  `}
                />
                <label
                  className={`  font-bold text-white `}
                >
                  Full Time
                </label>
              </div>{" "}
            </>
                            </div>
                        </div>}
        </form>
      </div>
      <div
        className={`relative phone:grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 grid pt-[20rem] mx-[10%] gap-x-8 gap-y-16`}
      >
        {jobs.map((job, index) => (
          <JobAds
            jobId={job.id}
            position={job.position}
            employmentType={job.employmentType}
            location={job.location}
            localDateTime={job.localDateTime}
            companyName={job.companyName}
            userId={job.userId}
            index={index}
          />
        ))}
      </div>
      <div className="flex justify-center">
        {!isLastPage && (
          <button
            type="button"
            onClick={handleLoadMore}
            className="tomas-button mt-15"
          >
            Load More
          </button>
        )}
      </div>
    </>
  );
};

export default SearchBar;
