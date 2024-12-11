import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios'; // Import axios directly
import { allowedAdminEmails } from './AdminEmails';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Axios instance with default configurations
  const api = axios.create({
    baseURL: 'https://ecommercebackend-8gx8.onrender.com', // Backend URL
    withCredentials: true, // Include cookies in requests
  });

  useEffect(() => {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      setUser(null); // Clear user state if session expired
    }
  }, []);

  // const signup = async (name, email, password) => {
  //   const response = await api.post('/auth/signup', { name, email, password });
  //   const { userId } = response.data;

  //   // Store userId in sessionStorage
  //   sessionStorage.setItem('userId', userId);

  //   setUser({ name, email, userId });
  //   return userId;
  // };

  const signup = async (name, email, password) => {
    try {
      const response = await api.post('/auth/signup', { name, email, password });

      const { userId } = response.data;
      sessionStorage.setItem('userId', userId);
      setUser({ name, email, userId });
      return userId;
    } catch (err) {
      console.error('Signup error:', err.response?.data?.error || err.message);
      throw err;
    }
  };


  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });

      if (response.data.message === 'Login successful') {
        const { userId } = response.data;
        console.log("response.data", response.data)

        // // Save userId in sessionStorage
        // sessionStorage.setItem('userId', userId);
        // if (allowedAdminEmails().includes(response.data.email)) {
        //   setUser({ userId, isAdmin: true });
        // } else {
        //   setUser({ userId, isAdmin: false });
        // }

        sessionStorage.setItem('userId', userId);
        console.log("Logged-in Email:", email);

        // Use the email entered by the user (since backend does not return it)
        const isAdmin = allowedAdminEmails().includes();
        console.log(isAdmin)
        console.log(isAdmin)
        // Update the user state with email and admin status
        setUser({ userId, email, isAdmin });

        // Update the state with the logged-in user


        return 'Login successful';
      } else {
        throw new Error('Login failed');
      }
    } catch (err) {
      if (err.response?.data?.error === 'Account is suspended') {
        alert('Your account is suspended from further notice due to unusual activity');
      } else if (err.response?.data?.error === 'Account is blocked') {
        alert('Your account has been terminated');
      }
      console.error('Login error:', err.response?.data?.error || err.message);
      throw err;
    }
  };

  // const logout = async () => {
  //   await api.post('/auth/logout');
  //   setUser(null);
  // };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
      setUser(null);
      sessionStorage.removeItem('userId');
    } catch (err) {
      console.error('Logout error:', err.response?.data?.error || err.message);
      throw err;
    }
  };


  const fetchUserName = async (userId) => {
    const response = await api.get(`/auth/user/${userId}`);
    return response.data.name;
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout, fetchUserName }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth };
