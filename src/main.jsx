import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'

/*  CSS (order maintain pannunga) */
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-calendar/dist/Calendar.css'
import 'react-toastify/dist/ReactToastify.css'

import './assets/css/style.css'
import './assets/css/responsive.css'

/*  App */
import App from './App'

/*  Context Providers */
import { AuthProvider } from './context/AuthContext'
import { UserProvider } from './context/UserContext'

/*  Root Render */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <AuthProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </AuthProvider>
    </HashRouter>
  </StrictMode>
)
