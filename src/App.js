import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Formulario from "./components/Formulario";
function App() {
    return (
        <main className="container bg-dark p-3">
            <h1 className="display-6 text-center text-light mt-3">
                Alta de peliculas <i className="bi bi-camera-video"></i>
            </h1>
            <hr className="mt-0 mx-5 text-light " />
            <Formulario />
        </main>
    );
}

export default App;
