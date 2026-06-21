import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export type User = {
  user_id: number; // updated from `id` to match backend field
  name: string;
  email: string;
  role: "customer" | "restaurant_owner" | "admin";
};

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    role: "customer" | "restaurant_owner" | "admin"
  ) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("foodUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      const userData: User = response.data.user;
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem("foodUser", JSON.stringify(userData));
    } catch (err: any) {
      throw new Error(err.response?.data?.message || "Login failed");
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    role: "customer" | "restaurant_owner" | "admin"
  ) => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", {
        name,
        email,
        password,
        role,
      });

      const userData: User = response.data.user;
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem("foodUser", JSON.stringify(userData));
    } catch (err: any) {
      throw new Error(err.response?.data?.message || "Signup failed");
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("foodUser");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
