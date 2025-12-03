import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  isGuest?: boolean;
}

interface AuthContextType {
  user: User | null;
  isGuest: boolean;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  setGuestMode: () => void;
  clearGuestMode: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isGuest, setIsGuest] = useState<boolean>(() => {
    return localStorage.getItem("isGuest") === "true";
  });

  const login = (email: string, password: string) => {
    // Mock login - in production this would call an API
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const foundUser = users.find(
      (u: any) => u.email === email && u.password === password
    );

    if (foundUser) {
      const loggedUser = { id: foundUser.id, name: foundUser.name, email: foundUser.email };
      setUser(loggedUser);
      setIsGuest(false);
      localStorage.setItem("user", JSON.stringify(loggedUser));
      localStorage.removeItem("isGuest");
      return true;
    }
    return false;
  };

  const register = (name: string, email: string, password: string) => {
    // Mock register - in production this would call an API
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    
    if (users.some((u: any) => u.email === email)) {
      return false; // User already exists
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    const loggedUser = { id: newUser.id, name: newUser.name, email: newUser.email };
    setUser(loggedUser);
    setIsGuest(false);
    localStorage.setItem("user", JSON.stringify(loggedUser));
    localStorage.removeItem("isGuest");
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsGuest(false);
    localStorage.removeItem("user");
    localStorage.removeItem("isGuest");
  };

  const setGuestMode = () => {
    const guestUser: User = {
      id: `guest-${Date.now()}`,
      name: "Invitado",
      email: "",
      isGuest: true,
    };
    setUser(guestUser);
    setIsGuest(true);
    localStorage.setItem("isGuest", "true");
  };

  const clearGuestMode = () => {
    setIsGuest(false);
    localStorage.removeItem("isGuest");
  };

  return (
    <AuthContext.Provider value={{ user, isGuest, login, register, logout, setGuestMode, clearGuestMode }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
