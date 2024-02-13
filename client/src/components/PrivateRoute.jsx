import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token'); // Assume que o token está armazenado no localStorage

    return token ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;
