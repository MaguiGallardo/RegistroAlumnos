import './InscripcionAlumno.css';
import { Link } from 'react-router-dom';

function InscripcionAlumnoPage() {
    return (
        <div className="inscripcion-container">
            <Link to='/'>Ir a home</Link> 
            <h2>Registro de Alumno</h2>
            <form>
                <span>Ingrese su Nombre y apellido</span>
                <input type="text" />

                <span>Ingrese su Edad</span>
                <input type="number" />

                <button className="registrarse-btn">Registrarse</button>
            </form>
            
        </div>
    );
}

export default InscripcionAlumnoPage;

