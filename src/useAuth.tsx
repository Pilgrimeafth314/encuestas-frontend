import { createContext, useContext, useState } from 'react';

export interface AuthResponse {
  token: string;
  roles: string[];
}

interface AuthContextType {
  isAuthenticated: boolean;
  userInfo: AuthResponse;
  login: (credentialResponse: AuthResponse) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: any) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null);

  const login = (userInfo: AuthResponse) => {
    setIsAuthenticated(true);
    setUserInfo(userInfo);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserInfo(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');

  return context;
}
