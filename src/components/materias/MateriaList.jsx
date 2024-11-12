import React, { useState, useEffect } from "react";
import { db } from "../config/firebaseConfig";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import MateriaForm from "./MateriaForm";
import MateriaCard from "./MateriaCard"; // Este puede ser un componente para mostrar cada materia individualmente

const MateriaList = () => {
  const [materias, setMaterias] = useState([]);
  const [selectedMateria, setSelectedMateria] = useState(null);
  const [loading, setLoading] = useState(true);

  // Función para obtener las materias desde Firebase
  const fetchMaterias = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "materias"));
      const materiasData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMaterias(materiasData);
    } catch (error) {
      console.error("Error al obtener materias:", error);
    }
    setLoading(false);
  };

  // Función para eliminar una materia
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("¿Seguro que quieres eliminar esta materia?");
    if (confirmDelete) {
      try {
        await deleteDoc(doc(db, "materias", id));
        fetchMaterias();
      } catch (error) {
        console.error("Error al eliminar materia:", error);
      }
    }
  };

  // Función para seleccionar una materia para editarla
  const handleEdit = (materia) => {
    setSelectedMateria(materia);
  };

  // Función que se ejecuta cuando se agrega o edita una materia
  const handleSuccess = () => {
    fetchMaterias();
    setSelectedMateria(null); // Limpiar la materia seleccionada para edición
  };

  useEffect(() => {
    fetchMaterias();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Lista de Materias</h2>
      
      {/* Formulario para agregar o editar una materia */}
      <MateriaForm existingData={selectedMateria} onSuccess={handleSuccess} />

      {/* Mostrar un mensaje mientras se cargan las materias */}
      {loading ? (
        <p>Cargando materias...</p>
      ) : (
        <ul className="space-y-4">
          {/* Renderizar cada materia */}
          {materias.map((materia) => (
            <li key={materia.id}>
              <MateriaCard
                materia={materia}
                onEdit={handleEdit} // Pasar la función para editar
                onDelete={handleDelete} // Pasar la función para eliminar
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MateriaList;
