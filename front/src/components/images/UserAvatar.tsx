import { useDataContext } from "../contexts/DataContext";
import image from "../../assets/default.jpg"

const UserAvatar = ({userId}: {userId:number}) => {

    const {url} = useDataContext();

    return (
        <>
   <img 
            src={`${url}/api/users/${userId}/avatar`}
            alt="User avatar"
            className="w-12 h-12 rounded-xl"
            onError={(e) => {
                e.currentTarget.src = `${image}`
            }}
        />
        </>
    );
};

export default UserAvatar