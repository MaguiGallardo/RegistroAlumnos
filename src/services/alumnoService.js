import { db } from "./firebaseConfig"; // Importa la configuración de Firebase
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore"; // Funciones de Firestore

// Función para obtener todos los alumnos
export const getAlumnos = async () => {
  const alumnosCollection = collection(db, "alumnos"); // Accede a la colección de "alumnos"
  const snapshot = await getDocs(alumnosCollection); // Obtiene todos los documentos de la colección
  const alumnosList = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return alumnosList; // Retorna la lista de alumnos
};

// Función para agregar un nuevo alumno
export const addAlumno = async (nuevoAlumno) => {
  try {
    const alumnosCollection = collection(db, "alumnos"); // Accede a la colección de "alumnos"
    const docRef = await addDoc(alumnosCollection, nuevoAlumno); // Agrega un nuevo documento
    return docRef.id; // Retorna el ID del nuevo alumno
  } catch (error) {
    console.error("Error al agregar el alumno:", error);
    throw error;
  }
};

// Función para actualizar un alumno
export const updateAlumno = async (id, alumnoActualizado) => {
  try {
    const alumnoDoc = doc(db, "alumnos", id); // Accede al documento del alumno por su ID
    await updateDoc(alumnoDoc, alumnoActualizado); // Actualiza el documento
    return id; // Retorna el ID del alumno actualizado
  } catch (error) {
    console.error("Error al actualizar el alumno:", error);
    throw error;
  }
};

// Función para eliminar un alumno
export const deleteAlumno = async (id) => {
  try {
    const alumnoDoc = doc(db, "alumnos", id); // Accede al documento del alumno por su ID
    await deleteDoc(alumnoDoc); // Elimina el documento
    return id; // Retorna el ID del alumno eliminado
  } catch (error) {
    console.error("Error al eliminar el alumno:", error);
    throw error;
  }
};
