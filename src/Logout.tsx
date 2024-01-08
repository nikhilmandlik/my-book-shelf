import { googleLogout } from '@react-oauth/google';
import { userContext } from './UserContextProvider';
import { useContext } from 'react';
import { Button } from 'react-bootstrap';

function Logout() {
  const userData = useContext(userContext);

  function handleLogout() {
    googleLogout();
    userData.setCurrentUserinfo(undefined);
  }

  return (
    <Button className="col-12" onClick={handleLogout}>
      Logout
    </Button>
  );
}

export default Logout;
