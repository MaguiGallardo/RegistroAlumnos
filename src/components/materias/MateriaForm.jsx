import React, { useState, useEffect } from "react";
import { db } from "../config/firebaseConfig";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";

const MateriaForm = ({ existingData, onSuccess }) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [id, setId] = useState(null);

  useEffect(() => {
    if (existingData) {
      setNombre(existingData.nombre);
      setDescripcion(existingData.descripcion);
      setId(existingData.id);
    }
  }, [existingData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (id) {
        const materiaRef = doc(db, "materias", id);
        await updateDoc(materiaRef, { nombre, descripcion });
      } else {
        await addDoc(collection(db, "materias"), { nombre, descripcion });
      }

      setNombre("");
      setDescripcion("");
      setId(null);
      onSuccess();
    } catch (error) {
      console.error("Error al registrar la materia:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto bg-white shadow-md rounded">
      <h2 className="text-lg font-semibold mb-4">{id ? "Editar Materia" : "Agregar Materia"}</h2>
      <label className="block mb-2">
        Nombre:
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded mt-1"
          required
        />
      </label>
      <label className="block mb-4">
        Descripción:
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded mt-1"
          required
        />
      </label>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        {id ? "Actualizar Materia" : "Registrar Materia"}
      </button>
    </form>
  );
};

export default MateriaForm;
