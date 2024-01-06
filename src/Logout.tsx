import { googleLogout } from '@react-oauth/google';
import { userContext } from './UserContextProvider';
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
    const userData = useContext(userContext);
    const navigate = useNavigate();

    function handleLogout() {
        googleLogout();
        userData.setCurrentUserinfo(undefined);
        navigate("/");
    }

    return <button onClick={handleLogout}>Logout</button>;
}

export default Logout;