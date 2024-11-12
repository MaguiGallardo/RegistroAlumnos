import React from "react";
import { Link } from "react-router-dom"; // Si estás utilizando React Router para la navegación

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo o nombre de la aplicación */}
        <div className="text-white text-xl font-bold">
          <Link to="/">Registro Escolar</Link>
        </div>

        {/* Enlaces de navegación */}
        <div className="space-x-6">
          <Link
            to="/alumnos"
            className="text-white hover:text-blue-300"
          >
            Alumnos
          </Link>
          <Link
            to="/materias"
            className="text-white hover:text-blue-300"
          >
            Materias
          </Link>
        </div>

        {/* Opción para cerrar sesión, si tienes autenticación */}
        {/* <div>
          <button className="text-white hover:text-blue-300">
            Cerrar sesión
          </button>
        </div> */}
      </div>
    </nav>
  );
};

export default Navbar;
