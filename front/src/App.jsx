import InscripcionAlumnoPage from './pages/InscripcionAlumnoPage';
import VisualizarPage from './pages/VisualizarPage';
import AsignarMateriaPage from './pages/AsignarMateriaPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h4>Home</h4>} />
        <Route path="/home" element={<VisualizarPage />} />
        <Route path="/registro" element={<InscripcionAlumnoPage />} />
        <Route path="/materias" element={<AsignarMateriaPage />} />
      </Routes>
    </Router>
  );
}

export default App;

