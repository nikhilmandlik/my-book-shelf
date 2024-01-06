import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google';

import './index.css'
import UserContext from './UserContextProvider.tsx';
const clientId = process.env.CLIENT_ID || '';

ReactDOM.createRoot(document.getElementById('root')!).render(

    <GoogleOAuthProvider clientId={clientId}>
      <UserContext>
        <App />
      </UserContext>
    </GoogleOAuthProvider>,
)
