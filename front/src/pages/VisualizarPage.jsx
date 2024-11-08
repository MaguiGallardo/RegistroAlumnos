import './VisualizarPage.css';
import { useNavigate } from 'react-router-dom';

function VisualizarPage() {
    const navigate = useNavigate();

    const handleRegisterClick = () => {
        navigate('/registro');  // Redirige a la página de Inscripción de Alumnos
    };


    const listAlumnos = [{
        nombre: "Pedro",
        edad: 21,
        materias: ["Matemática"]
    },
    {
        nombre: "magui",
        edad: 20,
        materias: ["Lengua"]
    }
    ];
    return (
        <div>
            <h2>Lista de Alumnos</h2>
            < ul >
                <h1>Alumnos Inscriptos</h1>
                {listAlumnos.map(alumno => {
                    return (

                        <li>
                            <span>{alumno.nombre}</span>
                            <span>{alumno.edad}</span>
                            <a>{alumno.materias}</a>
                        </li>
                    );
                })
                }

                <button onClick={handleRegisterClick} className="register-button">
                    Registrar Nuevo Alumno
                </button>
            </ul >
        </div>
    );

}

export default VisualizarPage;