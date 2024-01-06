import { useContext } from 'react';
import './App.css';
import Login from './Login';
import { userContext } from './UserContextProvider';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './Home';
import AppLayout from './AppLayout';
import Books from './Books';

function App() {
  const userData = useContext(userContext);

  return (
    <BrowserRouter>
      {userData.currentUserinfo ? (
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<Books />} />
          </Route>
        </Routes>
      ) : <Login />}


    </BrowserRouter>
  )
}

export default App
