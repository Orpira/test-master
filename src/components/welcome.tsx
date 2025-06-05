import React from "react";
import { useNavigate } from "react-router-dom";

const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const startTest = () => {
    navigate("/quiz"); // Redirige siempre a seleccionar tipo de test
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: "url('/welcome.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Encabezado */}
      <header className="w-full flex justify-between items-center px-6 py-4 bg-black bg-opacity-60 text-white">
        <div className="text-2xl font-bold flex items-center gap-2">
          <img src="/favicon.svg" alt="Logo" className="w-8 h-8" />
          <span>Test Master</span>
        </div>
        <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-sm font-semibold transition">
          Iniciar sesión
        </button>
      </header>

      {/* Sección central */}
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="bg-black bg-opacity-80 backdrop-blur-sm p-10 rounded-xl shadow-2xl text-white max-w-2xl text-center animate-fade-in">
          <h1 className="text-4xl font-bold mb-6">
            ¡Bienvenido/a al{" "}
            <span className="text-yellow-400">Test de Conocimientos</span>!
          </h1>
          <p className="mb-6 text-lg leading-relaxed">
            Pon a prueba tus habilidades en{" "}
            <span className="text-blue-300 font-semibold">HTML</span>,{" "}
            <span className="text-pink-300 font-semibold">CSS</span> y{" "}
            <span className="text-yellow-300 font-semibold">JavaScript</span>{" "}
            con nuestros desafíos interactivos.
          </p>
          <button
            className="px-6 py-3 bg-green-500 hover:bg-green-600 transition font-semibold rounded shadow-md"
            onClick={startTest}
          >
            Comenzar Test
          </button>
        </div>
      </main>

      {/* Pie de página */}
      <footer className="text-center text-sm text-gray-300 bg-black bg-opacity-60 py-3">
        Tip: Recuerda que en este sitio, las etiquetas no se cierran solas 😜
      </footer>
    </div>
  );
};

export default Welcome;
