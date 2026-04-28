import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const useLogout = () => {
  const { logoutUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    //  clear everything
    logoutUser();
    localStorage.removeItem("token");
    sessionStorage.clear();

    // IMPORTANT: force redirect
    window.location.href = "/#/login";
  };

  return handleLogout;
};

export default useLogout;