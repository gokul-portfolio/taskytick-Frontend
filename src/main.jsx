import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";

/* custom css */
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-calendar/dist/Calendar.css";
import "./assets/css/style.css";
import "./assets/css/responsive.css";

import App from "./App";
// import { AuthProvider } from "./context/AuthContext";
// import { UserProvider } from "./context/UserContext";

createRoot(document.getElementById("root")).render(

  <StrictMode>

    <HashRouter>
      {/* <AuthProvider> */}
      {/* <UserProvider> */}
      <App />
      {/* </UserProvider> */}
      {/* </AuthProvider> */}
    </HashRouter>

  </StrictMode>

);
