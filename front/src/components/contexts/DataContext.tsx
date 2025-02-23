import { createContext, ReactNode, useContext, useState } from "react";

type DataContextType = {
    url: string;
    error: string;
    setError: (error: string) => void;
    success: string;
    setSuccess: (error: string) => void;
    isLoading: boolean;
    setisLoading: (isLoading: boolean) => void;
    isDarkMode: boolean;
    setIsDarkMode: (isDarkMode: boolean) => void;
    updateHomepage: number;
    setUpdateHomepage: (updateHomepage: number) => void;
    timeoutForError: (message:string) => void;
    timeoutForSuccess: (message:string) => void;
}

const DataContext = createContext<DataContextType>({
    url: "",
    error:"",
    setError: () => {},
    success: "",
    setSuccess: () => {},
    isLoading: false,
    setisLoading: () => {},
    isDarkMode: false,
    setIsDarkMode: () => {},
    updateHomepage: 0,
    setUpdateHomepage: () => {},
    timeoutForError: () => {},
    timeoutForSuccess:() => {}
});

export const useDataContext = () => {
    return useContext(DataContext);
}

export const DataProvider = ({children}: {children: ReactNode}) => {
    const url: string = "http://localhost:8080";
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [isLoading, setisLoading] = useState<boolean>(false)
    const [isDarkMode,setIsDarkMode] = useState<boolean>(false)
    const [updateHomepage,setUpdateHomepage] = useState<number>(0);

    const timeoutForError = (message: string) => {
        setError(message)
        setTimeout(() => {
            setError("")
        },2500)
    }
    const timeoutForSuccess = (message:string) => {
        setSuccess(message)
        setTimeout(() => {
            setSuccess("")
        },2000)
    }


    return (
        <DataContext.Provider value={{url,error,setError,success, setSuccess, isLoading, setisLoading,timeoutForError,timeoutForSuccess,isDarkMode,setIsDarkMode,updateHomepage,setUpdateHomepage}}>
            {children}
        </DataContext.Provider>
    )
}