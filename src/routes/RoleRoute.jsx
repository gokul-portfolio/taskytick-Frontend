import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RoleRoute = ({ children, roles = [] }) => {
  const { user, loading } = useAuth();

  //  WAIT UNTIL AUTH LOADS
  if (loading) {
    return <div>Loading...</div>;
  }

  //  NOT LOGGED IN
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  //  ROLE CHECK
  if (roles.length && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default RoleRoute;