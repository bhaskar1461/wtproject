import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function hydrateUser() {
      const savedUser = localStorage.getItem("helpdesk_user");
      const token = localStorage.getItem("helpdesk_token");

      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await api.get("/auth/me");
        localStorage.setItem("helpdesk_user", JSON.stringify(data.user));
        setUser(data.user);
      } catch {
        localStorage.removeItem("helpdesk_token");
        localStorage.removeItem("helpdesk_user");
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    hydrateUser();
  }, []);

  const login = async (payload) => {
    const { data } = await api.post("/auth/login", payload);
    localStorage.setItem("helpdesk_token", data.token);
    localStorage.setItem("helpdesk_user", JSON.stringify(data.user));
    setUser(data.user);
    return data;
  };

  const register = async (payload) => {
    const { data } = await api.post("/auth/register", payload);
    localStorage.setItem("helpdesk_token", data.token);
    localStorage.setItem("helpdesk_user", JSON.stringify(data.user));
    setUser(data.user);
    return data;
  };

  const logout = () => {
    localStorage.removeItem("helpdesk_token");
    localStorage.removeItem("helpdesk_user");
    setUser(null);
  };

  const updateUser = (nextUser) => {
    localStorage.setItem("helpdesk_user", JSON.stringify(nextUser));
    setUser(nextUser);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
