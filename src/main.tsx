import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './scss/styles.scss';

import UserContext from './UserContextProvider';
import BookContext from './BookContextProvider';
const clientId = process.env.CLIENT_ID || '';

const rootElement = document.getElementById('root');
const renderElement = clientId ? (
  <GoogleOAuthProvider clientId={clientId}>
    <UserContext>
      <BookContext>
        <App />
      </BookContext>
    </UserContext>
  </GoogleOAuthProvider>
) : (
  <h1>'CLIENT_ID' Environment variable is missing from .env file</h1>
);

ReactDOM.createRoot(rootElement!).render(renderElement);
