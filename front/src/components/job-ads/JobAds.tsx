import { useEffect, useState } from "react";
import { useDataContext } from "../contexts/DataContext";
import UserAvatar from "../images/UserAvatar";

interface JobAd {
    jobId: number;
    position: string;
    employmentType: string;
    location: string;
    localDateTime: string;
    companyName: string;
    userId: number;
    index:number;

}

interface JobResponse {
    content: JobAd[];
    totalPages: number;
    totalElements: number;
    last:boolean;
}


const JobAds: React.FC<JobAd> = ({jobId,position,employmentType,location,localDateTime,companyName,userId,index}) => {
    const {isDarkMode} = useDataContext();

    const parseDate = (localDateTime: string) => {
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;
        const week = day * 7;
        const month = week * 4;
        const year = month * 12;

        const datePosted = Date.parse(localDateTime)
        const dateNow = Date.now();
        const result = dateNow - datePosted;
            if(result < minute - second) {
            return Math.round(result/second) + "s"
            }
            if (result  < hour - minute) {
                return Math.round(result/minute) + "min"
            }
            if (result < day - hour) {
                return Math.round(result/hour) + "h"
            }
            if (result < week) {
                return Math.round(result/day) + "d"
            }
            if (result < month + (day*2)) {
                return Math.round(result/week) + "w"
            }
            if (result < year) {
                return Math.round(result/month) + "mon"
            }
            if (result > year) {
                return Math.round(result/year) + "y"
            }
    }


    return ( 
    <>
            <div key={index} className={`relative ps-7 pt-15 pb-8 rounded-md duration-500 ${isDarkMode ? "dark-card-color" : "bg-white"}`} >
                <div className="absolute top-[-10%] left-[8%]">
                <UserAvatar userId={userId}/>
                </div>
                <div className={`text-sm flex gap-3 duration-500 ${isDarkMode ? "text-white opacity-50" : "text-gray-500"}`}>
                <p>{parseDate(localDateTime)} ago</p>
                <p>•</p>
                <p className="capitalize">{employmentType.split("_").join(" ").toLowerCase()}</p>
                </div>
                <p className={`font-bold text-xl capitalize duration-500 pt-5 ${isDarkMode && "text-white"}`}>{position}</p>
                <p className={`text-sm duration-500 capitalize pt-5 ${isDarkMode ? "text-white opacity-50" : "text-gray-500"}`}>{companyName}</p>
                <p className={`text-sm duration-500 capitalize pt-10 font-bold ${isDarkMode ? "text-blue-600" : "text-navy-color"}`}>{location.split("_").join(" ").toLowerCase()}</p>
            </div>
    </> );
}
 
export default JobAds;