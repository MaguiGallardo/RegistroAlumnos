import React from "react";
import { Link } from "react-router-dom"; // Importa el componente Link para navegación

const HomePage = () => {
  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-4xl font-bold mb-8">Bienvenido al Sistema de Gestión de Alumnos y Materias</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Enlace para ir a la página de alumnos */}
        <Link
          to="/alumnos"
          className="bg-green-600 text-white py-4 px-8 rounded-md hover:bg-green-700"
        >
          Gestionar Alumnos
        </Link>

        {/* Enlace para ir a la página de materias */}
        <Link
          to="/materias"
          className="bg-blue-600 text-white py-4 px-8 rounded-md hover:bg-blue-700"
        >
          Gestionar Materias
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
