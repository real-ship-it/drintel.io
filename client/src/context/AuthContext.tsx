import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "wouter";

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  hasPaid: boolean;
  isLoading: boolean;
  login: (email: string) => void;
  logout: () => void;
  completePayment: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [hasPaid, setHasPaid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useLocation();
  const [lastActivity, setLastActivity] = useState<number>(Date.now());

  // Check for existing session on load
  useEffect(() => {
    const storedUser = localStorage.getItem("drintel_user");
    const storedPayment = localStorage.getItem("drintel_paid");
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedPayment === "true") {
      setHasPaid(true);
    }
    setIsLoading(false); // Auth check complete
  }, []);

  // Security: Session timeout after 30 minutes of inactivity
  useEffect(() => {
    const sessionTimeout = 30 * 60 * 1000; // 30 minutes
    
    const handleActivity = () => {
      setLastActivity(Date.now());
    };

    const checkSessionTimeout = setInterval(() => {
      if (user && Date.now() - lastActivity > sessionTimeout) {
        // Auto-logout due to inactivity
        setUser(null);
        setHasPaid(false);
        localStorage.removeItem("drintel_user");
        localStorage.removeItem("drintel_paid");
        setLocation("/");
      }
    }, 60000); // Check every minute

    // Track user activity
    window.addEventListener("click", handleActivity);
    window.addEventListener("keypress", handleActivity);
    window.addEventListener("scroll", handleActivity);

    return () => {
      clearInterval(checkSessionTimeout);
      window.removeEventListener("click", handleActivity);
      window.removeEventListener("keypress", handleActivity);
      window.removeEventListener("scroll", handleActivity);
    };
  }, [user, lastActivity, setLocation]);

  const login = (email: string) => {
    // Extract name from email or use demo name
    const nameFromEmail = email === "admin@drintel.com" ? "Dr. Admin Demo" : email.split("@")[0];
    const mockUser = { name: nameFromEmail, email };
    setUser(mockUser);
    localStorage.setItem("drintel_user", JSON.stringify(mockUser));
    
    // Demo account or demo-related emails auto-grant paid access
    if (email.includes("demo") || email === "admin@drintel.com") {
        setHasPaid(true);
        localStorage.setItem("drintel_paid", "true");
    }
  };

  const logout = () => {
    setUser(null);
    setHasPaid(false);
    localStorage.removeItem("drintel_user");
    localStorage.removeItem("drintel_paid");
    setLocation("/");
  };

  const completePayment = () => {
    setHasPaid(true);
    localStorage.setItem("drintel_paid", "true");
    setLocation("/dashboard"); // Redirect to dashboard after payment
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, hasPaid, isLoading, login, logout, completePayment }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
