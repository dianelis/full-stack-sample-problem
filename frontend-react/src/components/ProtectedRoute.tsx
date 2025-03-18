import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = false;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};
