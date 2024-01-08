import { useContext } from 'react';
import { Userinfo, userContext } from './UserContextProvider';

function Home() {
  // todo: move currentUserinfo to navbar
  const { currentUserinfo }: { currentUserinfo: Userinfo } =
    useContext(userContext);

  return (
    <>
      <h1>Welcome {currentUserinfo.name}</h1>
    </>
  );
}

export default Home;
