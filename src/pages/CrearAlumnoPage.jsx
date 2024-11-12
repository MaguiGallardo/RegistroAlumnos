import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

const CrearAlumnoPage = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [edad, setEdad] = useState("");
  const [dni, setDni] = useState("");
  const [error, setError] = useState(""); // Estado para mostrar errores
  const navigate = useNavigate();

  // Validar y agregar el alumno a Firestore
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Limpiar el mensaje de error

    // Validar que la edad sea mayor a 18
    if (parseInt(edad) < 18) {
      setError("Solo se pueden registrar alumnos mayores de 18 años.");
      return;
    }

    try {
      // Comprobar si el DNI ya existe en la colección "alumnos"
      const q = query(collection(db, "alumnos"), where("dni", "==", dni));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setError("El DNI ingresado ya está registrado para otro alumno.");
        return;
      }

      // Agregar el alumno a la colección "alumnos" en Firestore
      await addDoc(collection(db, "alumnos"), {
        nombre,
        apellido,
        edad,
        dni,
      });

      // Limpiar los campos después de enviar
      setNombre("");
      setApellido("");
      setEdad("");
      setDni("");

      // Redirigir a la página de alumnos después de agregar
      navigate("/alumnos");
    } catch (error) {
      console.error("Error al agregar el alumno:", error);
      setError("Hubo un problema al registrar el alumno. Inténtelo nuevamente.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Agregar Nuevo Alumno</h1>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-md rounded p-4">
        {error && <p className="text-red-500 mb-4">{error}</p>} {/* Mostrar error si existe */}

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
          <label className="block text-sm font-medium text-gray-700">Apellido</label>
          <input
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
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
            min="18"
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">DNI</label>
          <input
            type="text"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
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
