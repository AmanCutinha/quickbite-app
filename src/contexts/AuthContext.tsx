
import React, { createContext, useContext, useState, useEffect } from "react";

export type User = {
  id: string;
  name: string;
  email: string;
  role: "customer" | "restaurant_owner";
};

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: "customer" | "restaurant_owner") => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check for saved user in local storage
    const savedUser = localStorage.getItem("foodUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    // In a real app, this would make an API call
    // For now, we'll mock this
    if (email && password) {
      // Mock check for admin@test.com with password "admin"
      if (email === "admin@test.com" && password === "admin") {
        const mockUser = {
          id: "1",
          name: "Admin User",
          email: email,
          role: "restaurant_owner" as const,
        };
        setUser(mockUser);
        setIsAuthenticated(true);
        localStorage.setItem("foodUser", JSON.stringify(mockUser));
        return;
      }
      
      // Mock check for user@test.com with password "user"
      if (email === "user@test.com" && password === "user") {
        const mockUser = {
          id: "2",
          name: "Test User",
          email: email,
          role: "customer" as const,
        };
        setUser(mockUser);
        setIsAuthenticated(true);
        localStorage.setItem("foodUser", JSON.stringify(mockUser));
        return;
      }
      
      throw new Error("Invalid credentials");
    } else {
      throw new Error("Email and password are required");
    }
  };

  const register = async (name: string, email: string, password: string, role: "customer" | "restaurant_owner") => {
    // In a real app, this would make an API call
    // For now, we'll mock this
    if (name && email && password) {
      const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        email,
        role,
      };
      
      setUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem("foodUser", JSON.stringify(newUser));
    } else {
      throw new Error("All fields are required");
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("foodUser");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated }}>
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
