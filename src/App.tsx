import { useContext } from 'react';
import Login from './Login';
import BookForm from './BookForm';
import { userContext } from './UserContextProvider';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import '../node_modules/@popperjs/core/dist/umd/popper.min.js';

import Home from './Home';
import AppLayout from './AppLayout';
import Books from './Books';
import BookDetails from './BookDetails';

function App() {
  const userData = useContext(userContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={userData?.currentUserinfo?.name ? <AppLayout /> : <Login />}
        >
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/create" element={<BookForm />} />
          <Route path="/books/:bookId" element={<BookDetails />} />
          <Route path="/*" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
