import { useEffect, useState } from "react";
import image from "../../assets/default.jpg"
import { useDataContext } from "../contexts/DataContext";

const PrivateAvatar = () => {
    const { url,timeoutForError } = useDataContext();
    const [avatarUrl, setAvatarUrl] = useState<string>(image);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchAvatar = async () => {
            try {
                const response = await fetch(`${url}/api/users/avatar`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    const blob = await response.blob();
                    const imageUrl = URL.createObjectURL(blob);
                    setAvatarUrl(imageUrl);
                } else {
                    timeoutForError(`Failed to fetch avatar: ${response.status}`);
                }
            } catch (error) {
                timeoutForError(error)
                setAvatarUrl(image);
            }
        };

        if (token) {
            fetchAvatar();
        } else {
            setAvatarUrl(image);
        }

        return () => {
            if (avatarUrl !== image) {
                URL.revokeObjectURL(avatarUrl);
            }
        };
    }, [url, token]);

    return (
        <img 
            src={avatarUrl}
            alt="User avatar"
            className=" border-white border-2 phone:w-15 phone:h-15 rounded-full tablet:ms-5"
        />
    );
};

export default PrivateAvatar;