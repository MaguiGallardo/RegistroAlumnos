import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import MateriaCard from "../components/materias/MateriaCard";

const MateriasPage = () => {
  const [materias, setMaterias] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
  const navigate = useNavigate();

  const fetchMaterias = async () => {
    const querySnapshot = await getDocs(collection(db, "materias"));
    const materiasList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setMaterias(materiasList);
  };

  // Función para eliminar una materia
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar esta materia?");
    if (confirmDelete) {
      try {
        await deleteDoc(doc(db, "materias", id)); // Elimina la materia de Firestore
        setMaterias(materias.filter((materia) => materia.id !== id)); // Actualiza el estado
      } catch (error) {
        console.error("Error al eliminar la materia:", error);
      }
    }
  };

  useEffect(() => {
    fetchMaterias();
  }, []);

  // Filtrar materias en función del término de búsqueda
  const filteredMaterias = materias.filter((materia) =>
    materia.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Lista de Materias</h1>

      {/* Campo de búsqueda */}
      <input
        type="text"
        placeholder="Buscar materia por nombre"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full mb-4 p-2 border border-gray-300 rounded"
      />

      {/* Botón para agregar una nueva materia */}
      <Link
        to="/materias/crear"
        className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
      >
        Agregar Nueva Materia
      </Link>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredMaterias.map((materia) => (
          <MateriaCard
            key={materia.id}
            materia={materia}
            onEdit={() => navigate(`/materias/editar/${materia.id}`)}
            onDelete={() => handleDelete(materia.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default MateriasPage;
