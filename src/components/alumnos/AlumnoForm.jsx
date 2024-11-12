import React, { useState, useEffect } from "react";
import { db } from "../config/firebaseConfig";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";

const AlumnoForm = ({ existingData, onSuccess }) => {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [id, setId] = useState(null);

  useEffect(() => {
    if (existingData) {
      setNombre(existingData.nombre);
      setEdad(existingData.edad);
      setId(existingData.id);
    }
  }, [existingData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (id) {
        // Si ya tiene un id, actualizamos el alumno
        const alumnoRef = doc(db, "alumnos", id);
        await updateDoc(alumnoRef, { nombre, edad });
      } else {
        // Si no tiene id, lo agregamos como nuevo
        await addDoc(collection(db, "alumnos"), { nombre, edad });
      }

      // Limpiamos el formulario y llamamos a onSuccess
      setNombre("");
      setEdad("");
      setId(null);
      onSuccess(); // Llama a la función de éxito para actualizar el estado o cerrar el formulario
    } catch (error) {
      console.error("Error al registrar el alumno:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto bg-white shadow-md rounded">
      <h2 className="text-lg font-semibold mb-4">{id ? "Editar Alumno" : "Agregar Alumno"}</h2>
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
        Edad:
        <input
          type="number"
          value={edad}
          onChange={(e) => setEdad(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded mt-1"
          required
        />
      </label>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        {id ? "Actualizar Alumno" : "Registrar Alumno"}
      </button>
    </form>
  );
};

export default AlumnoForm;
