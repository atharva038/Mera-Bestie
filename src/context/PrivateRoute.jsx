// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const PrivateRoute = ({ children, adminOnly = false }) => {
//     const { user } = useAuth();

//     if (!user) {
//         // Redirect to login if the user isn't logged in
//         return <Navigate to="/login" />;
//     }

//     if (adminOnly && !user.isAdmin) {
//         // Redirect if user doesn't have admin permissions
//         return <Navigate to="/" />;
//     }

//     return children;
// };

// export default PrivateRoute;
