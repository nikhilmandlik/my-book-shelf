import { useContext } from 'react';
import Login from './Login';
import BookForm from './BookForm';
import { userContext } from './UserContextProvider';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import '../node_modules/@popperjs/core/dist/umd/popper.min.js';

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
            <Route path="/books/create" element={<BookForm />} />
          </Route>
        </Routes>
      ) : (
        <Login />
      )}
    </BrowserRouter>
  );
}

export default App;
