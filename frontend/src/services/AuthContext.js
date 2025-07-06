import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const t = await AsyncStorage.getItem("token");
      const u = await AsyncStorage.getItem("user");
      if (t && u) {
        setToken(t);
        setUser(JSON.parse(u));
      }
      setLoading(false);
    };
    load();
  }, []);

  const login = async (email, password) => {
    const res = await axios.post(
      `${process.env.API_URL || "http://localhost:5000/api"}/auth/login`,
      { email, password }
    );
    setToken(res.data.token);
    setUser(res.data.user);
    await AsyncStorage.setItem("token", res.data.token);
    await AsyncStorage.setItem("user", JSON.stringify(res.data.user));
  };

  const register = async (data) => {
    await axios.post(
      `${process.env.API_URL || "http://localhost:5000/api"}/auth/register`,
      data
    );
    // Après inscription, on peut rediriger vers login
  };

  const logout = async () => {
    setToken(null);
    setUser(null);
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
