import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

function ProtectedRoute({ children }) {
  const [isAllowed, setIsAllowed] = useState(null); 

  useEffect(() => {
    async function checkUser() {
      try {
        let response = await axios.get('http://localhost:2500/event', { withCredentials: true });
        if (response.data.status === 200) {
          setIsAllowed(true);
        } else {
          setIsAllowed(false);
        }
      } catch (err) {
        setIsAllowed(false);
      }
    }

    checkUser();
  }, []);

  

  if (!isAllowed) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
