import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";


const AuthButtons = () => {

    const {isAuthenticated,logout} = useAuth();
    const navigate = useNavigate();

    return (
    <>
        {!isAuthenticated ? (
            <>
                <button onClick={() => navigate("/login")} className="tomas-navbar-button">Login</button>
                <button onClick={() => navigate("/registration")} className="tomas-navbar-button">Register</button>
            </>
        ) : (
            <>
                <button onClick={() => navigate("/profile")} className="tomas-navbar-button">Profile</button>
                <button onClick={() => {navigate("/")
                    logout()
                }} className="tomas-navbar-button">Logout</button>
            </>
        )}
        <button onClick={() => navigate("/")} className="tomas-navbar-button">Homepage</button>
    </>
    )
};
export default AuthButtons;