import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const barbeiro = localStorage.getItem('barbeiro');

  if (!barbeiro) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export const ClientProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const cliente = localStorage.getItem('cliente');

  if (!cliente) {
    return <Navigate to="/cliente/login" replace />;
  }

  return <>{children}</>;
};

