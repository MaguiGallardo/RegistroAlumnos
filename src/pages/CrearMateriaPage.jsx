import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig"; // Importa la configuración de Firebase

const CrearMateriaPage = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [cupo, setCupo] = useState(""); // Campo para el cupo de la materia
  const navigate = useNavigate();

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Agregar la materia a la colección "materias" en Firestore
      await addDoc(collection(db, "materias"), {
        nombre,
        descripcion,
        cupo, // Guardamos el cupo
      });

      // Limpiar los campos después de enviar
      setNombre("");
      setDescripcion("");
      setCupo(""); // Limpiar el campo cupo

      // Redirigir a la página de materias después de agregar
      navigate("/materias");
    } catch (error) {
      console.error("Error al agregar la materia:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Agregar Nueva Materia</h1>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-md rounded p-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Descripción</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Cupos</label>
          <input
            type="number"
            value={cupo}
            onChange={(e) => setCupo(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
        >
          Registrar Materia
        </button>
      </form>
    </div>
  );
};

export default CrearMateriaPage;
