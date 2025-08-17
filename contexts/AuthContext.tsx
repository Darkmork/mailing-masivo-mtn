
import React, { createContext, useState, useContext, useMemo } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authToken, setAuthToken] = useState<string | null>(null);

  const login = (token: string) => {
    setAuthToken(token);
    // Here you would typically set the token in axios headers
    // For simplicity, we'll just manage the state
  };

  const logout = () => {
    setAuthToken(null);
  };

  const value = useMemo(() => ({
    isAuthenticated: !!authToken,
    login,
    logout,
  }), [authToken]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
