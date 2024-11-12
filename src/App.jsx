import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Importa React Router
import Navbar from "./components/Navbar"; // Importa el componente Navbar
import AlumnosPage from "./pages/AlumnosPage"; // Importa la página de alumnos
import MateriasPage from "./pages/MateriasPage"; // Importa la página de materias
import HomePage from "./pages/HomePage"; // Importa la página de inicio
import CrearAlumnoPage from "./pages/CrearAlumnoPage"; // Asegúrate de importar el componente de crear alumno
import CrearMateriaPage from "./pages/CrearMateriaPage"; // Asegúrate de importar la página para crear materia
import EditarAlumnoPage from "./pages/EditarAlumnoPage"; // Asegúrate de importar la 


const App = () => {
  return (
    <Router>
      <div>
        <Navbar /> {/* Muestra la barra de navegación */}
        <Routes>
          {/* Definir las rutas de las páginas */}
          <Route path="/" element={<HomePage />} /> {/* Página principal */}
          <Route path="/alumnos" element={<AlumnosPage />} /> {/* Página de alumnos */}
          <Route path="/alumnos/crear" element={<CrearAlumnoPage />} /> {/* Ruta para el formulario */}
          <Route path="/alumnos/editar/:id" element={<EditarAlumnoPage />} />
          <Route path="/materias" element={<MateriasPage />} /> {/* Página de materias */}
          <Route path="/materias/crear" element={<CrearMateriaPage />} /> {/* Ruta para el formulario de crear materia */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
