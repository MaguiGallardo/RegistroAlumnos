// MateriaCard.js
import React from "react";

const MateriaCard = ({ materia, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="text-xl font-bold mb-2">{materia.nombre}</h2>
      <p>{materia.descripcion}</p>
      <p>Cupo: {materia.cupo}</p>
      <div className="mt-4 flex space-x-2">
        <button onClick={onEdit} className="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600">
          Editar
        </button>
        <button onClick={onDelete} className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600">
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default MateriaCard;
