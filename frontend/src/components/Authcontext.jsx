import { createContext, useContext, useEffect, useState } from "react";
import { loginUser, signupUser, fetchCurrentUser } from "./authApi";

const AuthContext = createContext(null);

const TOKEN_KEY = "somnia_auth_token";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [loading, setLoading] = useState(true);

  // On first load, if a token is saved, validate it and fetch the user.
  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    fetchCurrentUser(token)
      .then((u) => setUser(u))
      .catch(() => {
        // Token expired/invalid — clear it out.
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, [token]);

  const login = async (email, password) => {
    const data = await loginUser({ email, password });
    localStorage.setItem(TOKEN_KEY, data.access_token);
    setToken(data.access_token);
    setUser(data.user);
    return data.user;
  };

  const signup = async (name, email, password) => {
    const data = await signupUser({ name, email, password });
    localStorage.setItem(TOKEN_KEY, data.access_token);
    setToken(data.access_token);
    setUser(data.user);
    return data.user;
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside an <AuthProvider>");
  }
  return ctx;
}