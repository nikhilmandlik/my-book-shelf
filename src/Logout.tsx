import { googleLogout } from '@react-oauth/google';
import { userContext } from './UserContextProvider';
import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { useQueryClient } from '@tanstack/react-query';

function Logout() {
  const userData = useContext(userContext);
  const queryClient = useQueryClient();

  function handleLogout() {
    queryClient.removeQueries();
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
