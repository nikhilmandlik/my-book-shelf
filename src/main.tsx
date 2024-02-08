import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './scss/styles.scss';

import UserContext from './UserContextProvider';
import BookContext from './BookContextProvider';
const clientId = process.env.CLIENT_ID || '';
const queryClient = new QueryClient();

const rootElement = document.getElementById('root');
const renderElement = clientId ? (
  <QueryClientProvider client={queryClient}>
    <GoogleOAuthProvider clientId={clientId}>
      <UserContext>
        <BookContext>
          <App />
        </BookContext>
      </UserContext>
    </GoogleOAuthProvider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
) : (
  <h1>'CLIENT_ID' Environment variable is missing from .env file</h1>
);

ReactDOM.createRoot(rootElement!).render(renderElement);
