import { db } from "./firebaseConfig"; // Importa la configuración de Firebase
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore"; // Funciones de Firestore

// Función para obtener todas las materias
export const getMaterias = async () => {
  const materiasCollection = collection(db, "materias"); // Accede a la colección de "materias"
  const snapshot = await getDocs(materiasCollection); // Obtiene todos los documentos de la colección
  const materiasList = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return materiasList; // Retorna la lista de materias
};

// Función para agregar una nueva materia
export const addMateria = async (nuevaMateria) => {
  try {
    const materiasCollection = collection(db, "materias"); // Accede a la colección de "materias"
    const docRef = await addDoc(materiasCollection, nuevaMateria); // Agrega un nuevo documento
    return docRef.id; // Retorna el ID de la nueva materia
  } catch (error) {
    console.error("Error al agregar la materia:", error);
    throw error;
  }
};

// Función para actualizar una materia
export const updateMateria = async (id, materiaActualizada) => {
  try {
    const materiaDoc = doc(db, "materias", id); // Accede al documento de la materia por su ID
    await updateDoc(materiaDoc, materiaActualizada); // Actualiza el documento
    return id; // Retorna el ID de la materia actualizada
  } catch (error) {
    console.error("Error al actualizar la materia:", error);
    throw error;
  }
};

// Función para eliminar una materia
export const deleteMateria = async (id) => {
  try {
    const materiaDoc = doc(db, "materias", id); // Accede al documento de la materia por su ID
    await deleteDoc(materiaDoc); // Elimina el documento
    return id; // Retorna el ID de la materia eliminada
  } catch (error) {
    console.error("Error al eliminar la materia:", error);
    throw error;
  }
};
