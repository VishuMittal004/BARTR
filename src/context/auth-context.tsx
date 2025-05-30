"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';

// Define the type for our user
interface User {
  id: string;
  phoneNumber: string;
  name?: string;
}

// Define the auth context state
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (phoneNumber: string, password: string) => Promise<void>;
  signup: (phoneNumber: string, name: string, password: string) => Promise<void>;
  logout: () => void;
  redirectToLogin: (returnTo?: string) => void;
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Protected routes that require authentication
const protectedRoutes = [
  '/search',
  '/messaging',
  '/requests',
  '/profile',
];

// Provider component that wraps your app and makes auth available
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Check if the user is authenticated on initial load
  useEffect(() => {
    // This would typically be an API call to verify token
    // For now, we'll use localStorage as a simple way to persist login state
    const checkAuth = () => {
      const storedUser = localStorage.getItem('bartr_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // Check if the current route requires authentication
  useEffect(() => {
    if (!isLoading && !user && protectedRoutes.some(route => pathname?.startsWith(route))) {
      // Save the current path for redirection after login
      sessionStorage.setItem('bartr_returnTo', pathname || '/');
      router.push('/login');
    }
  }, [pathname, user, isLoading, router]);

  // Mock login function (in a real app, this would call an API)
  const login = async (phoneNumber: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      const newUser = {
        id: 'user123',
        phoneNumber,
      };
      
      setUser(newUser);
      localStorage.setItem('bartr_user', JSON.stringify(newUser));
      
      // Get the return path and redirect
      const returnTo = sessionStorage.getItem('bartr_returnTo') || '/';
      sessionStorage.removeItem('bartr_returnTo');
      router.push(returnTo);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Mock signup function
  const signup = async (phoneNumber: string, name: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful signup
      const newUser = {
        id: 'user123',
        phoneNumber,
        name,
      };
      
      setUser(newUser);
      localStorage.setItem('bartr_user', JSON.stringify(newUser));
      
      // Get the return path and redirect
      const returnTo = sessionStorage.getItem('bartr_returnTo') || '/';
      sessionStorage.removeItem('bartr_returnTo');
      router.push(returnTo);
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('bartr_user');
    router.push('/');
  };

  // Redirect to login with return path
  const redirectToLogin = (returnTo?: string) => {
    if (returnTo) {
      sessionStorage.setItem('bartr_returnTo', returnTo);
    }
    router.push('/login');
  };

  // Context value
  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout,
    redirectToLogin
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
