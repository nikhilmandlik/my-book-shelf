import { TokenResponse, useGoogleLogin } from '@react-oauth/google';
import { userContext } from './UserContextProvider';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

async function getUserData(
  tokenResponse: Omit<
    TokenResponse,
    'error' | 'error_description' | 'error_uri'
  >
) {
  const { access_token } = tokenResponse;
  const userInfo = await getUserInfo(access_token);

  return {
    ...userInfo,
    access_token,
  };
}

async function getUserInfo(accessToken) {
  const url = `https://www.googleapis.com/oauth2/v3/userinfo?alt=json&access_token=${accessToken}`;
  return await fetch(url).then((res) => res.json());
}

function Login() {
  const userData = useContext(userContext);
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      // console.log('tokenResponse', tokenResponse);
      userData.setCurrentUserinfo(await getUserData(tokenResponse));
      navigate('/');
    },
    scope: 'https://www.googleapis.com/auth/drive',
  });

  return (
    <div className="container text-center">
      <div className="card p-3 d-flex justify-content-center">
        <h1>Welcome to My Bookshelf</h1>
        <p className="mt-4">Please login using google account to continue</p>
        <button
          type="button"
          className="btn btn-primary mt-4"
          onClick={() => login()}
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default Login;
