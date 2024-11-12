import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getDocs, collection } from "firebase/firestore"; // Importa funciones de Firestore
import { db } from "../config/firebaseConfig";  // Ajusta según la ubicación correcta
import MateriaCard from "../components/materias/MateriaCard";
import { useNavigate } from "react-router-dom"; // Para navegar entre páginas

const MateriasPage = () => {
  const [materias, setMaterias] = useState([]);
  const navigate = useNavigate();

  // Obtener las materias desde Firestore
  const fetchMaterias = async () => {
    const querySnapshot = await getDocs(collection(db, "materias")); // Accede a la colección de "materias"
    const materiasList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setMaterias(materiasList); // Actualiza el estado con las materias obtenidas
  };

  useEffect(() => {
    fetchMaterias(); // Llama a la función cuando el componente se monta
  }, []); // Solo se ejecuta una vez cuando el componente se monta

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Lista de Materias</h1>

      {/* Botón para agregar una nueva materia */}
      <Link
        to="/materias/crear"
        className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
      >
        Agregar Nueva Materia
      </Link>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Mostrar las materias utilizando el componente MateriaCard */}
        {materias.map((materia) => (
          <MateriaCard
            key={materia.id}
            materia={materia}
            onEdit={() => navigate(`/materias/editar/${materia.id}`)} // Redirige a la página de editar
            onDelete={() => alert("Eliminar materia")} // Función de eliminación (puedes implementar la lógica)
          />
        ))}
      </div>
    </div>
  );
};

export default MateriasPage;
