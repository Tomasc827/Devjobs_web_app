import { createContext, ReactNode, useContext, useState } from "react";

type DataContextType = {
    url: string;
    error: string;
    setError: (error: string) => void;
    success: string;
    setSuccess: (error: string) => void;
    isloading: boolean;
    setIsLoading: (isLoading: boolean) => void;

}

const DataContext = createContext<DataContextType>({
    url: "",
    error:"",
    setError: () => {},
    success: "",
    setSuccess: () => {},
    isloading: false,
    setIsLoading: () => {}
});

export const useDataContext = () => {
    return useContext(DataContext);
}

export const DataProvider = ({children}: {children: ReactNode}) => {
    const url: string = "http://localhost:8080";
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [isloading, setIsLoading] = useState<boolean>(false)


    return (
        <DataContext.Provider value={{url,error,setError,success, setSuccess, isloading, setIsLoading}}>
            {children}
        </DataContext.Provider>
    )
}