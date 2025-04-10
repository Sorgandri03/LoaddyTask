import React from "react";
import { Navigate } from "react-router-dom";

// Mock authentication function
const isAuthenticated = () => {
    // Replace this with your actual authentication logic
    return Boolean(localStorage.getItem("isAuthenticated"));
};

const PrivateRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
export { isAuthenticated };