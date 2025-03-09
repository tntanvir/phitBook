import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = sessionStorage.getItem("token");

    return isAuthenticated ? children : <Navigate to="/singin" replace />;
};

export default ProtectedRoute;
