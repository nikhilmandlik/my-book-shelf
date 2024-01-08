import { Outlet } from 'react-router-dom';
import NavigationBar from './NavigationBar';

function AppLayout() {
  return (
    <>
      <NavigationBar />
      <Outlet />
    </>
  );
}

export default AppLayout;
