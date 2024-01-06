import { TokenResponse, useGoogleLogin } from '@react-oauth/google';
import { userContext } from './UserContextProvider';
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

async function getUserData(tokenResponse: Omit<TokenResponse, 'error' | 'error_description' | 'error_uri'>) {
    const { access_token } = tokenResponse;
    const userInfo = await getUserInfo(access_token);

    return {
        ...userInfo,
        access_token,
    };
}

async function getUserInfo(accessToken) {
    const url = `https://www.googleapis.com/oauth2/v3/userinfo?alt=json&access_token=${accessToken}`;
    return await fetch(url).then(res => res.json());
}

function Login() {
    const userData = useContext(userContext);
    const navigate = useNavigate();

    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            // console.log('tokenResponse', tokenResponse);
            userData.setCurrentUserinfo(await getUserData(tokenResponse));
            navigate("/");
        },
        scope: 'https://www.googleapis.com/auth/drive',
    });

    return <>
        <h1>Book Summary</h1>
        <button onClick={() => login()}>Sign in with Google 🚀</button>;
    </>;
}

export default Login;


// import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
// import { jwtDecode } from "jwt-decode";
// import { Userinfo, userContext } from './UserContextProvider';
// import { useContext } from "react";
// import { useNavigate } from "react-router-dom";

// function getUserData(credentialResponse: CredentialResponse) {
//     const { credential } = credentialResponse;
//     const userInfo: Userinfo = jwtDecode(credential);
//     console.log(credential);
//     console.log(userInfo);

//     return userInfo;
// }

// function Login() {
//     const userData = useContext(userContext);
//     const navigate = useNavigate();

//     return <>
//         <h1>Book Summary</h1>
//         <GoogleLogin
//             onSuccess={(credentialResponse) => {
//                 userData.setCurrentUserinfo(getUserData(credentialResponse));
//                 navigate("/");
//             }}
//             onError={() => {
//                 console.log('Login Failed');
//             }}
//         />
//     </>;
// }

// export default Login;
