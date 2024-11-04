function VisualizarPage() {
    const listAlumnos = [{
        nombre: "Pedro",
        edad: 21,
        materias: ["Matemática"]
    },
    {
        nombre: "magui",
        edad: 20,
        materias: ["gfjghh"]
    }
];
    return (
        < ul >
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
        </ul >
    );

}

export default VisualizarPage;