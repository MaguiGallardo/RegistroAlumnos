import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

const AlumnosPage = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
  const navigate = useNavigate();

  // Obtener los alumnos desde Firestore
  const fetchAlumnos = async () => {
    const querySnapshot = await getDocs(collection(db, "alumnos"));
    const alumnosList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setAlumnos(alumnosList);
  };

  useEffect(() => {
    fetchAlumnos();
  }, []);

  // Función para eliminar un alumno
  const handleDelete = async (alumnoId) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este alumno?");
    if (confirmDelete) {
      try {
        await deleteDoc(doc(db, "alumnos", alumnoId));
        fetchAlumnos(); // Recarga la lista después de eliminar
      } catch (error) {
        console.error("Error al eliminar el alumno:", error);
      }
    }
  };

  // Filtrar alumnos en función del término de búsqueda
  const filteredAlumnos = alumnos.filter((alumno) =>
    `${alumno.nombre} ${alumno.apellido}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Lista de Alumnos</h1>

      {/* Campo de búsqueda */}
      <input
        type="text"
        placeholder="Buscar alumno por nombre o apellido"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full mb-4 p-2 border border-gray-300 rounded"
      />

      {/* Botón para agregar un nuevo alumno */}
      <Link
        to="/alumnos/crear"
        className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 mb-4 inline-block"
      >
        Agregar Nuevo Alumno
      </Link>

      {/* Tabla de alumnos */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Apellido
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Edad
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                DNI
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Opciones
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAlumnos.map((alumno) => (
              <tr key={alumno.id}>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{alumno.nombre}</td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{alumno.apellido}</td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{alumno.edad}</td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{alumno.dni}</td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                  <button
                    onClick={() => navigate(`/alumnos/editar/${alumno.id}`)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-yellow-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(alumno.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AlumnosPage;
