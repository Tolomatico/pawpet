import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import 'bootstrap/dist/css/bootstrap.min.css';
import Router from './Router.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { UserProvider } from './context/userContext.jsx';

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <GoogleOAuthProvider clientId={clientId}>
      <UserProvider>
        <Router />
        </UserProvider>
      </GoogleOAuthProvider>

  </StrictMode>,
)
