import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { useDataContext } from "../contexts/DataContext";
import PrivateAvatar from "../images/PrivateAvatar";

interface PropsModal {
  setIsModalOpen: (value: boolean) => void;
}

const AuthButtons: React.FC<PropsModal> = ({ setIsModalOpen }) => {
  const { isAuthenticated, logout, userRoles } = useAuth();
  const {timeoutForSuccess} = useDataContext()
  const navigate = useNavigate();

  return (
    <>
      {!isAuthenticated ? (
        <>
          <button
            onClick={() => navigate("/login")}
            className="tomas-navbar-button"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/registration")}
            className="tomas-navbar-button"
          >
            Register
          </button>
        </>
      ) : (
        <>
        <PrivateAvatar/>
          <button
            onClick={() => {
              navigate("/");
              logout();
              timeoutForSuccess("Successfully logged out")
            }}
            className="tomas-navbar-button"
          >
            Logout
          </button>
          {userRoles.includes("ROLE_COMPANY") && (
            <button
              onClick={() => setIsModalOpen((prev) => !prev)}
              className="tomas-navbar-button"
            >
              Post Job Ad
            </button>
          )}
        </>
      )}
      <button onClick={() => navigate("/")} className="tomas-navbar-button">
        Homepage
      </button>
    </>
  );
};
export default AuthButtons;
