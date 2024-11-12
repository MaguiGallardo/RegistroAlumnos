// Importa las funciones necesarias de Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAzvzVPTSdMvOUKvHl90hFcmFiLMZS1KrM",
  authDomain: "crudalumnos-808c9.firebaseapp.com",
  projectId: "crudalumnos-808c9",
  storageBucket: "crudalumnos-808c9.firebasestorage.app",
  messagingSenderId: "258299521426",
  appId: "1:258299521426:web:4bbbc1bb4d9e7d21f5394b"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Obtén la instancia de Firestore
const db = getFirestore(app);

export { db };
