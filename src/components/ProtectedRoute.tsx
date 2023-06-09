import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ children, isAuthorized }) {
    if (isAuthorized != true) { 
        const location = useLocation();
        sessionStorage.setItem('lastPage', location.pathname)
        return (
            <Navigate to="/login" replace></Navigate>
        );
    }
    return children
};
