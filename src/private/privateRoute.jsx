import React, { useState, useEffect } from "react";
import { getAccessToken } from "../config/Auth";
import { Navigate } from "react-router-dom";

function PrivateRoute({ component: Component, ...rest }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
    async function fetchData() {
      const token = getAccessToken(); 
      
      if (token) {
        setIsAuthenticated(true);
      }

      setLoading(false);
    }
    
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="text-center flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/Login" />;
  }

  return <Component {...rest} />;
}

export default PrivateRoute;
