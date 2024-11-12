import React from "react"; // Importa React
import ReactDOM from "react-dom/client"; // Importa ReactDOM para montar la aplicación
import App from "./App"; // Importa el componente principal App
import "./index.css"; // Importa los estilos globales (como index.css, donde está Tailwind)

/* Monta el componente App en el DOM en el contenedor con id "root" */
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
