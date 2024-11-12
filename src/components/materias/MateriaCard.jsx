import React from "react";

const MateriaCard = ({ materia, onEdit, onDelete }) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-md flex justify-between items-center">
      {/* Contenido de la materia */}
      <div>
        <h3 className="text-lg font-semibold">{materia.nombre}</h3>
        <p className="text-sm text-gray-500">{materia.descripcion}</p>
      </div>

      {/* Botones de acción: Editar y Eliminar */}
      <div className="flex space-x-2">
        {/* Botón para editar */}
        <button
          onClick={() => onEdit(materia)}  // Llama a la función onEdit cuando se hace clic
          className="text-blue-500 hover:underline"
        >
          Editar
        </button>

        {/* Botón para eliminar */}
        <button
          onClick={() => onDelete(materia.id)}  // Llama a la función onDelete cuando se hace clic
          className="text-red-500 hover:underline"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default MateriaCard;

