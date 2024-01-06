import { useContext } from "react";
import { Userinfo, userContext } from "./UserContextProvider";
import { NavLink } from "react-router-dom";


function Home() {
    // todo: move currentUserinfo to navbar
    const { currentUserinfo } : {currentUserinfo: Userinfo} = useContext(userContext);

    return <>
        <h1>Welcome {currentUserinfo.name}</h1>

        <nav id="recipes">
            <NavLink to="/books">Books</NavLink>
        </nav>
    </>
}

export default Home;
