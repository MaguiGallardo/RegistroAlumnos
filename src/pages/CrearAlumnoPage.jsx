import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig"; // Importa tu configuración de Firebase

const CrearAlumnoPage = () => {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const navigate = useNavigate();

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Agregar el alumno a la colección "alumnos" en Firestore
      await addDoc(collection(db, "alumnos"), {
        nombre,
        edad,
      });

      // Limpiar los campos después de enviar
      setNombre("");
      setEdad("");

      // Redirigir a la página de alumnos después de agregar
      navigate("/alumnos");
    } catch (error) {
      console.error("Error al agregar el alumno:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Agregar Nuevo Alumno</h1>

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
          <label className="block text-sm font-medium text-gray-700">Edad</label>
          <input
            type="number"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
        >
          Registrar Alumno
        </button>
      </form>
    </div>
  );
};

export default CrearAlumnoPage;
