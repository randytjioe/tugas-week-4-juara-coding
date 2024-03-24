import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await axios.post("https://reqres.in/api/login", {
        email,
        password,
      });
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data)); 
    } catch (error) {
      console.error("Login failed:", error);
    }
  };


  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("cartItems");  
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
