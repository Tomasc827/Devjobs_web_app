import { jwtDecode } from "jwt-decode";
import { createContext, ReactNode, useContext, useState } from "react";

type AuthContextType = {
    isAuthenticated: boolean;
    userRoles: string[];
    login: (token: string) => void;
    logout: () => void;
}


const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    userRoles: [],
    login: () => {},
    logout: () => {}
});

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({children}: {children: ReactNode}) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem("token"))
    const [userRoles, setUserRoles] = useState<string[]>(() => {
        const storedRoles = localStorage.getItem("roles");
        return storedRoles ? JSON.parse(storedRoles) : [];
    })

    const login = (token: string) => {
        localStorage.setItem("token",token);
        setIsAuthenticated(true);
        const decoded: any = jwtDecode(token);
        const scopeString: string = decoded.scope || "";
        const roleArray = scopeString.split(" ").filter(role => role.startsWith("ROLE_"));
        localStorage.setItem("roles",JSON.stringify(roleArray))
        setUserRoles(roleArray);
    }

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("roles")
        setIsAuthenticated(false);
        setUserRoles([]);
    }

    return (
        <AuthContext.Provider value={{isAuthenticated,userRoles,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}


