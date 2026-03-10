'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

import { AuthAction } from '@/app/actions/auth';
import { User } from '@/graphql/@types/graphql.type';
import { toast } from '@/hooks/index';
import { StringUtil } from '@/shared/utils';

const STORE_USER_KEY = 'user';

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isLoggedIn: boolean;
  isLoading: boolean;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface IAuthProviderProps {
  children: React.ReactNode;
}
export function AuthProvider({ children }: IAuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const checkUser = JSON.parse(localStorage.getItem(STORE_USER_KEY) || '{}');
        const checkToken = await AuthAction();

        if (checkToken && checkUser?.id) {
          setUser(checkUser);
          setIsLoggedIn(true);
        } else {
          setUser(null);
          setIsLoggedIn(false);
        }
      } catch (error) {
        setUser(null);
        setIsLoggedIn(false);
        toast({
          title: 'Xác thực người dùng thất bại',
          description: StringUtil.errorMessage({ error }),
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = (userData: User) => {
    localStorage.setItem(STORE_USER_KEY, JSON.stringify(userData));
    setUser(userData);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem(STORE_USER_KEY);
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error('useAuth must be used within an AuthProvider');

  return context;
}
