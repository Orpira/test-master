import React from "react";
import { useAuthContext } from "../components/AuthContext";
import NavbarAuth from "../components/navbar/auth/NavbarAuth";
interface AppContentProps {
  isAuthenticated: boolean;
  children: React.ReactNode;
}

export function AppContent({ isAuthenticated, children }: AppContentProps) {
  const { user, logout } = useAuthContext();

  return (
    <div className="min-h-screen flex flex-col">
      {isAuthenticated ? (
        <NavbarAuth />
      ) : (
        <div className="p-4 bg-gray-200 text-gray-800">
          Please log in to access the content.
        </div>
      )}
      {children}
    </div>
  );
}

export default AppContent;
export function useAppContent() {
  const { isAuthenticated } = useAuthContext();
  return { isAuthenticated };
}
