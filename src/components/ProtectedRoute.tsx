import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { globalStore } from '../store/globalStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = await globalStore.auth.isAuthenticated();
      setIsAuthenticated(isAuthenticated);
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
