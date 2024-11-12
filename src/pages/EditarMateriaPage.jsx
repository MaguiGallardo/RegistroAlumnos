import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

const EditarMateriaPage = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [cupo, setCupo] = useState("");
  const navigate = useNavigate();
  const { id } = useParams(); // Obtiene el ID de la materia desde la URL

  useEffect(() => {
    const cargarMateria = async () => {
      const docRef = doc(db, "materias", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const materiaData = docSnap.data();
        setNombre(materiaData.nombre);
        setDescripcion(materiaData.descripcion);
        setCupo(materiaData.cupo);
      }
    };
    cargarMateria();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const docRef = doc(db, "materias", id);
      await updateDoc(docRef, {
        nombre,
        descripcion,
        cupo,
      });

      // Redirige a la página de materias después de actualizar
      navigate("/materias");
    } catch (error) {
      console.error("Error al actualizar la materia:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Editar Materia</h1>

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
          <label className="block text-sm font-medium text-gray-700">Cupo</label>
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
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default EditarMateriaPage;
