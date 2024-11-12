import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getDocs, collection } from "firebase/firestore"; // Importa funciones de Firestore
import { db } from "../config/firebaseConfig";
import AlumnoCard from "../components/alumnos/AlumnoCard";
import { useNavigate } from "react-router-dom"; // Para navegar entre páginas

const AlumnosPage = () => {
  const [alumnos, setAlumnos] = useState([]);
  const navigate = useNavigate();

  // Obtener los alumnos desde Firestore
  const fetchAlumnos = async () => {
    const querySnapshot = await getDocs(collection(db, "alumnos")); // Accede a la colección de "alumnos"
    const alumnosList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setAlumnos(alumnosList); // Actualiza el estado con los alumnos obtenidos
  };

  useEffect(() => {
    fetchAlumnos(); // Llama a la función cuando el componente se monta
  }, []); // Solo se ejecuta una vez cuando el componente se monta

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Lista de Alumnos</h1>

      {/* Botón para agregar un nuevo alumno */}
      <Link
        to="/alumnos/crear"
        className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
      >
        Agregar Nuevo Alumno
      </Link>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Mostrar los alumnos utilizando el componente AlumnoCard */}
        {alumnos.map((alumno) => (
          <AlumnoCard
            key={alumno.id}
            alumno={alumno}
            onEdit={() => navigate(`/alumnos/editar/${alumno.id}`)} // Redirige a la página de editar
            onDelete={() => alert("Eliminar alumno")} // Función de eliminación (puedes implementar la lógica)
          />
        ))}
      </div>
    </div>
  );
};

export default AlumnosPage;
