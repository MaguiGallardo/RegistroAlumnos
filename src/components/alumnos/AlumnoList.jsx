import React, { useEffect, useState } from "react";
import { db } from "../config/firebaseConfig";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import AlumnoForm from "./AlumnoForm";
import AlumnoCard from "./AlumnoCard";

const AlumnoList = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [selectedAlumno, setSelectedAlumno] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAlumnos = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "alumnos"));
      const alumnosData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAlumnos(alumnosData);
    } catch (error) {
      console.error("Error al obtener alumnos:", error);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("¿Seguro que quieres eliminar este alumno?");
    if (confirmDelete) {
      try {
        await deleteDoc(doc(db, "alumnos", id));
        fetchAlumnos();
      } catch (error) {
        console.error("Error al eliminar alumno:", error);
      }
    }
  };

  const handleEdit = (alumno) => {
    setSelectedAlumno(alumno);
  };

  const handleSuccess = () => {
    fetchAlumnos();
    setSelectedAlumno(null);
  };

  useEffect(() => {
    fetchAlumnos();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Lista de Alumnos</h2>
      <AlumnoForm existingData={selectedAlumno} onSuccess={handleSuccess} />
      {loading ? (
        <p>Cargando alumnos...</p>
      ) : (
        <ul className="space-y-4">
          {alumnos.map((alumno) => (
            <li key={alumno.id}>
              <AlumnoCard
                alumno={alumno}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AlumnoList;
