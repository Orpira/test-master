import React from "react";
import { NavLink } from "react-router-dom";
// Si usas Auth0 React SDK
import { useAuth0 } from "@auth0/auth0-react";

const NavbarAuth = () => {
  // Descomenta si usas Auth0 React SDK
  const { loginWithRedirect } = useAuth0();

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow">
      {/* Logo y nombre */}
      <div className="flex items-center space-x-3">
        <img src="/logo.png" alt="Logo" className="h-10 w-10 object-contain" />
        <span className="text-xl font-bold text-gray-800">Test Master</span>
      </div>

      {/* Opciones de navegación */}
      <ul className="flex items-center space-x-6">
        <li>
          <NavLink
            to="/tipotest"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Tipo Test
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/ranking"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Ranking
          </NavLink>
        </li>
        <li>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            onClick={() => {
              // Si usas Auth0 React SDK:
              // loginWithRedirect();
              // Si usas otra integración, reemplaza por la función de login correspondiente
              window.location.href = "https://TU_DOMINIO_AUTH0/login";
            }}
          >
            Cerrar sesión
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default NavbarAuth;
// src/components/navbar/auth/NavbarAuth.tsx
