import './InscripcionAlumno.css';


function InscripcionAlumnoPage() {
    return (
        <form>
            <span>Ingrese su Nombre y apellido</span>
            <input type="text" />

            <span>Ingrese su Edad</span>
            <input type="number" />

            <button>Registrarse</button>
        </form>



    );

}

export default InscripcionAlumnoPage;
