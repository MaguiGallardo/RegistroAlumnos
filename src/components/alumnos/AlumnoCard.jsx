import React from "react";

const AlumnoCard = ({ alumno, onEdit, onDelete }) => {
  return (
    <div className="p-4 border border-gray-300 rounded shadow">
      <h3 className="text-lg font-semibold">{alumno.nombre}</h3>
      <p>Edad: {alumno.edad}</p>
      <div className="flex space-x-2 mt-2">
        <button
          onClick={() => onEdit(alumno)}
          className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(alumno.id)}
          className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default AlumnoCard;
