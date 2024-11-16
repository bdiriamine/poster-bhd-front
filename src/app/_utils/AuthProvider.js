"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (storedToken) {
      setToken(storedToken);
      verifyToken(storedToken); // Call to verify the token
    }
  
    if (userData) {
      setUser(JSON.parse(userData));
    }
  
    setLoading(false); // Finish loading state
  }, []);

  const login = (userData, token) => {
    if (token) { // Check if token exists
      setUser(userData);
      setToken(token);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
    } else {
      console.error('No token received during login');
    }
  };

  const verifyToken = async (token) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/users/getMe`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
      });
  
      const result = await response.json();
  
      // Adjust here to access the user object correctly
      if (!response.ok || !result.data) {
        console.log("User not found or invalid token");
        handleLogout(); // Token is invalid or user not found
      } else {
        setUser(result.data); // Set user if the token is valid
      }
    } catch (error) {
      console.error('Error verifying token:', error);
      handleLogout(); // Handle error by logging out
    }
  };

  const handleLogout = () => {
    logout(); // Clear user state
    // Only clear the relevant items
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/'); // Redirect to home
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log('User logged out');
  };

  return (
    <AuthContext.Provider value={{ user, loading, token, login, logout }}>
      {!loading && children} {/* Prevent rendering children until loading is false */}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};