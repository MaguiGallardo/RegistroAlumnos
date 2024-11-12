import React from "react";
import { Link } from "react-router-dom"; // Importa el componente Link para navegación
import { Parser } from 'json2csv'; // Importa la función Parser de json2csv

const HomePage = () => {
  // Función para exportar los alumnos a CSV
  const exportToCSV = (data) => {
    try {
      const parser = new Parser();  // Crea una instancia del parser
      const csv = parser.parse(data);  // Convierte los datos a CSV
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'alumnos.csv'; // Nombre del archivo
      link.click(); // Simula un clic para descargar el archivo
    } catch (err) {
      console.error('Error al exportar CSV:', err);
    }
  };

  // Datos de ejemplo, reemplazar con los datos reales de alumnos o materias
  const alumnos = [
    { nombre: "Juan", apellido: "Pérez", edad: 20, dni: "12345678" },
    { nombre: "Ana", apellido: "Gómez", edad: 22, dni: "87654321" },
  ];

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

        {/* Botón para exportar los alumnos a CSV */}
        <button
          onClick={() => exportToCSV(alumnos)} // Pasa los datos de alumnos
          className="bg-yellow-600 text-white py-4 px-8 rounded-md hover:bg-yellow-700 mt-4"
        >
          Exportar Alumnos a CSV
        </button>
      </div>
    </div>
  );
};

export default HomePage;
