import React, { useState } from 'react';
import './AsignarMateria.css';


function PerfilAlumnoPage() {
    const [modoEdicion, setModoEdicion] = useState(false);
    const [nombre, setNombre] = useState('');
    const [edad, setEdad] = useState('');
    const [materiasInscriptas, setMateriasInscriptas] = useState([]);
    const [materiaSeleccionada, setMateriaSeleccionada] = useState('');
    const [mostrarModal, setMostrarModal] = useState(false);
    const [mensajeModal, setMensajeModal] = useState('');

    const materiasDisponibles = ['Matemática', 'Historia', 'Ciencias', 'Lengua'];

    const toggleModoEdicion = () => setModoEdicion(!modoEdicion);

    const handleGuardarCambios = () => {
        // Validación de datos
        if (!nombre || !edad || materiasInscriptas.length === 0) {
            setMensajeModal('Error: Complete todos los campos');
            setMostrarModal(true);
            return;
        }
        setMensajeModal('Cambios guardados exitosamente');
        setMostrarModal(true);
        setModoEdicion(false);
    };

    const handleAgregarMateria = () => {
        if (materiaSeleccionada && !materiasInscriptas.includes(materiaSeleccionada)) {
            setMateriasInscriptas([...materiasInscriptas, materiaSeleccionada]);
            setMateriaSeleccionada('');
        }
    };

    return (
        <div>
            <h2>Perfil del Alumno</h2>

            {modoEdicion ? (
                <form>
                    <span>Nombre:</span>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />

                    <span>Edad:</span>
                    <input
                        type="number"
                        value={edad}
                        onChange={(e) => setEdad(e.target.value)}
                    />

                    <span>Materias Inscriptas:</span>
                    <ul>
                        {materiasInscriptas.map((materia, index) => (
                            <li key={index}>{materia}</li>
                        ))}
                    </ul>

                    <span>Agregar Materia:</span>
                    <select
                        value={materiaSeleccionada}
                        onChange={(e) => setMateriaSeleccionada(e.target.value)}
                    >
                        <option value="">Selecciona una materia</option>
                        {materiasDisponibles.map((materia, index) => (
                            <option key={index} value={materia}>
                                {materia}
                            </option>
                        ))}
                    </select>
                    <button type="button" onClick={handleAgregarMateria}>
                        Agregar Materia
                    </button>

                    <button type="button" onClick={handleGuardarCambios}>
                        Guardar Cambios
                    </button>
                </form>
            ) : (
                <div>
                    <p><strong>Nombre:</strong> {nombre}</p>
                    <p><strong>Edad:</strong> {edad}</p>
                    <p><strong>Materias Inscriptas:</strong></p>
                    <ul>
                        {materiasInscriptas.map((materia, index) => (
                            <li key={index}>{materia}</li>
                        ))}
                    </ul>
                    <button onClick={toggleModoEdicion}>Editar Perfil</button>
                </div>
            )}

            {mostrarModal && (
                <div className="modal">
                    <p>{mensajeModal}</p>
                    <button onClick={() => setMostrarModal(false)}>Cerrar</button>
                </div>
            )}
        </div>
    );
}

export default PerfilAlumnoPage;
