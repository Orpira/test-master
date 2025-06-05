import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
// import { Spinner } from "../spinner/Spinner";
const Spinner = () => <div>Loading...</div>;
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <Spinner />;

  return isAuthenticated ? children : <Navigate to="/welcome" />;
}
