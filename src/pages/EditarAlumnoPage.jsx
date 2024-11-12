import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc, getDocs, collection } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

const EditarAlumnoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [materiasSeleccionadas, setMateriasSeleccionadas] = useState([]);
  const [materiasDisponibles, setMateriasDisponibles] = useState([]);
  const [materiasAsignadas, setMateriasAsignadas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  // Obtener los datos del alumno y las materias disponibles
  const fetchData = async () => {
    try {
      // Obtener los datos del alumno
      const alumnoDoc = await getDoc(doc(db, "alumnos", id));
      if (alumnoDoc.exists()) {
        const alumnoData = alumnoDoc.data();
        setNombre(alumnoData.nombre);
        setEdad(alumnoData.edad);
        setMateriasSeleccionadas(alumnoData.materias || []);
        setMateriasAsignadas(alumnoData.materias || []);
      }

      // Obtener todas las materias disponibles
      const querySnapshot = await getDocs(collection(db, "materias"));
      const materiasList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMateriasDisponibles(materiasList);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  // Mostrar u ocultar el modal
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  // Manejar la inscripción o baja de materias
  const handleMateriaToggle = async (materiaId, isAdding) => {
    const materiaDocRef = doc(db, "materias", materiaId);
    const materiaDoc = await getDoc(materiaDocRef);
    const materiaData = materiaDoc.data();

    if (isAdding) {
      // Inscribir al alumno si hay cupos disponibles
      if (materiaData.cupo > 0) {
        await updateDoc(materiaDocRef, { cupo: materiaData.cupo - 1 });
        setMateriasSeleccionadas([...materiasSeleccionadas, materiaId]);
      } else {
        alert("No hay cupos disponibles para esta materia.");
      }
    } else {
      // Dar de baja del alumno
      await updateDoc(materiaDocRef, { cupo: materiaData.cupo + 1 });
      setMateriasSeleccionadas(materiasSeleccionadas.filter(id => id !== materiaId));
    }
  };

  // Manejar el formulario de edición
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Actualizar los datos del alumno
      await updateDoc(doc(db, "alumnos", id), {
        nombre,
        edad,
        materias: materiasSeleccionadas,
      });
      navigate("/alumnos");
    } catch (error) {
      console.error("Error al actualizar el alumno:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Editar Alumno</h1>

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

        <div className="mb-4">
          <button
            type="button"
            onClick={toggleModal}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
          >
            Ver/Modificar Materias
          </button>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
        >
          Actualizar Alumno
        </button>
      </form>

      {/* Modal de Materias */}
      {modalVisible && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">Materias Disponibles</h2>
            <ul>
              {materiasDisponibles.map((materia) => {
                const isSelected = materiasSeleccionadas.includes(materia.id);
                return (
                  <li key={materia.id} className="flex justify-between items-center mb-2">
                    <span>{materia.nombre} - {materia.cupo} cupos disponibles</span>
                    <button
                      onClick={() => handleMateriaToggle(materia.id, !isSelected)}
                      className={`px-4 py-2 rounded text-white ${isSelected ? 'bg-red-500' : 'bg-green-500'}`}
                    >
                      {isSelected ? "Dar de baja" : "Inscribir"}
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="mt-4 text-center">
              <button
                onClick={toggleModal}
                className="bg-gray-500 text-white py-2 px-4 rounded"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditarAlumnoPage;
