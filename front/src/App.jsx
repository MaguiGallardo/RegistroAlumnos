import InscripcionAlumnoPage from './pages/InscripcionAlumnoPage';
import VisualizarPage from './pages/VisualizarPage';
import AsignarMateriaPage from './pages/AsignarMateriaPage';
import { Route, Routes } from 'react-router-dom';


function App() {
  return (
    <Routes>
      <Route path="/" element={<VisualizarPage />} />
      <Route path="/registro" element={<InscripcionAlumnoPage />} />
      <Route path="/materias" element={<AsignarMateriaPage />} />
    </Routes>
  );
}

export default App;

