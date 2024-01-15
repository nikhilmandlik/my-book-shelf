import { createContext, useState } from 'react';

interface Userinfo {
  aud: string;
  azp: string;
  email: string;
  email_verified: boolean;
  exp: number;
  family_name: string;
  given_name: string;
  iat: number;
  iss: string;
  jti: string;
  locale: string;
  name: string;
  nbf: number;
  picture: string;
  sub: string;
  access_token: string;
}

const userContext = createContext({
  currentUserinfo: undefined,
  setCurrentUserinfo: null,
});

function UserContextProvider(props) {
  const [currentUserinfo, setCurrentUserinfo] = useState<
    Userinfo | undefined
  >();

  return (
    <userContext.Provider value={{ currentUserinfo, setCurrentUserinfo }}>
      {props.children}
    </userContext.Provider>
  );
}

export default UserContextProvider;
export { userContext };
export type { Userinfo };
