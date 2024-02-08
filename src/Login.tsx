import { useGoogleLogin } from '@react-oauth/google';
import { userContext } from './UserContextProvider';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Alert } from 'react-bootstrap';

function Login() {
  const [accessToken, setAccessToken] = useState<string | undefined>();
  const userData = useContext(userContext);
  const navigate = useNavigate();

  const url = `https://www.googleapis.com/oauth2/v3/userinfo?alt=json&access_token=${accessToken}`;
  const { error, isLoading, data } = useQuery({
    queryKey: ['userInfo'],
    enabled: Boolean(accessToken),
    queryFn: () => fetch(url).then((res) => res.json()),
  });

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const { access_token } = tokenResponse;
      setAccessToken(access_token);
    },
    onError: () => {
      setAccessToken(null);
    },
    scope: 'https://www.googleapis.com/auth/drive',
  });

  useEffect(() => {
    if (data && !data.error) {
      userData.setCurrentUserinfo({
        accessToken,
        ...data,
      });
      navigate('/home');
    }
  }, [accessToken, data, navigate, userData]);

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  return (
    <div className="container text-center">
      <div className="card p-3 d-flex justify-content-center">
        <h1>Login to My Bookshelf</h1>
        <p className="mt-4">Please login using google account to continue</p>
        {isLoading ? (
          <h1>Loading</h1>
        ) : (
          <button
            type="button"
            className="btn btn-primary mt-4"
            onClick={() => login()}
          >
            Sign in with Google
          </button>
        )}
        {error || data?.error ? (
          <Alert className="mt-2" key="danger" variant="danger">
            {data.error_description}
          </Alert>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Login;
