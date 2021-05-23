import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';

import api from '../utils/api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      async function loadUserFromCookies() {
         const token = Cookies.get('token');
         if (token && token.access_token) {
            console.log("Got a token in the cookies, let's see if it is valid");
            console.log(token.token.access_token);
            api.defaults.headers.Authorization = `Bearer ${token.access_token}`;
            const { data: user } = await api.get('users/:[id]');
            if (user) setUser(user);
         }
         setLoading(false);
      }
      loadUserFromCookies();
   }, []);

   return (
      <AuthContext.Provider value={{ isAuthenticated: !!user, user, loading }}>
         {children}
      </AuthContext.Provider>
   );
};

export const useAuth = () => useContext(AuthContext);
