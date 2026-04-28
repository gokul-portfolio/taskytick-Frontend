import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { Spinner } from "react-bootstrap";

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useUser();

  //  WAIT until loading complete
  if (loading) {
    return (
      <div style={styles.loaderWrapper}>
        <div style={styles.loaderBox}>
          <Spinner animation="border" />
          <p style={{ marginTop: "10px" }}>Checking authentication...</p>
        </div>
      </div>
    );
  }

  // 🔐 AFTER loading only check user
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

const styles = {
  loaderWrapper: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f8f9fa",
  },
  loaderBox: {
    textAlign: "center",
  },
};