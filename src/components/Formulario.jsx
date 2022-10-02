import ListaPeliculas from "./ListaPeliculas";
import { Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
//import { validarTitulo, validarCategoria, validarSinopsis } from "./helpers";
import Swal from "sweetalert2";
const valoresInicialesForm = {
    titulo: "",
    categoria: "",
    sinopsis: "",
};

const Formulario = () => {
    const peliculasLocalStorage = JSON.parse(localStorage.getItem("keyListaPeliculas")) || [];
    const [pelicula, setPelicula] = useState(valoresInicialesForm);
    const [listadoPeliculas, setListadoPeliculas] = useState(peliculasLocalStorage);

    useEffect(() => {
        localStorage.setItem("keyListaPeliculas", JSON.stringify(listadoPeliculas));
    }, [listadoPeliculas]);

    const handleChange = (e) => {
        //desestructuro el name y el value del objeto e.tarjet:
        const { name, value } = e.target;
        setPelicula({ ...pelicula, [name]: value });
    };

    //variables para controlar las leyendas
    const [displayTitulo, setDisplayTitulo] = useState("none");
    const [displayCategoria, setDisplayCategoria] = useState("none");
    const [displaySinopsis, setDisplaySinopsis] = useState("none");

    //validaciones
    const validarTitulo = (titulo) => {
        let expReg = /^[a-zA-ZÀ-ÿ\s]{2,25}$/; // Letras y espacios, pueden llevar acentos.
        if (expReg.test(titulo.trim())) {
            setDisplayTitulo("none");
            return true;
        } else {
            setDisplayTitulo("block");
            return false;
        }
    };
    const validarCategoria = (categoria) => {
        //en este caso al ser categoria un select solo debemos validar que el value del select no sea igual a 0
        console.log(categoria);
        if (categoria === 0) {
            setDisplayCategoria("block");
            return false;
        } else {
            setDisplayCategoria("none");
            return true;
        }
    };
    const validarSinopsis = (sinopsis) => {
        if (sinopsis.length >= 15 && sinopsis.length <= 80) {
            setDisplaySinopsis("none");
            return true;
        } else {
            setDisplaySinopsis("block");
            return false;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validarTitulo(pelicula.titulo) && validarCategoria(pelicula.categoria) && validarSinopsis(pelicula.sinopsis)) {
            setListadoPeliculas([...listadoPeliculas, pelicula]);
            setPelicula(valoresInicialesForm);
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Algo va mal!",
                footer: "Verifica que hayas cargado bien los datos",
            });
        }
    };

    return (
        <>
            <section className="container border rounded p-3 bg-light">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="Form.ControlInput1">
                        <Form.Label className="fs-5 lead ms-2">Título</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Ej: Forrest Gump"
                            onChange={handleChange}
                            onBlur={() => validarTitulo(pelicula.titulo)}
                            name="titulo"
                            value={pelicula.titulo}
                        />
                        <Form.Label className="fs-7 ms-2 mt-0 text-danger" style={{ display: displayTitulo }}>
                            El campo Titulo es requerido. Se requiere un mínimo de 2 caracteres a un maximo de 25.
                        </Form.Label>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="Form.ControlInput2">
                        <Form.Label className="fs-5 lead ms-2">Categoría</Form.Label>
                        {/* al Form.Select no le anda el required de bootstrap... ??? */}
                        <Form.Select
                            required
                            aria-label="Default select "
                            onChange={handleChange}
                            onBlur={() => validarCategoria(pelicula.categoria)}
                            name="categoria"
                            value={pelicula.categoria}
                        >
                            <option value="0">Seleccione una opción...</option>
                            <option value="1">Acción</option>
                            <option value="2">Comedia</option>
                            <option value="3">Infantíl</option>
                        </Form.Select>
                        <Form.Label className="fs-7 ms-2 mt-0 text-danger" style={{ display: displayCategoria }}>
                            Selecciona un opción
                        </Form.Label>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="Form.ControlTextarea1">
                        <Form.Label className="fs-5 lead ms-2">Sinopsis</Form.Label>
                        <Form.Control
                            required
                            as="textarea"
                            rows={3}
                            placeholder="Agregue un resumen breve de la pelicula."
                            onChange={handleChange}
                            onBlur={() => validarSinopsis(pelicula.sinopsis)}
                            name="sinopsis"
                            value={pelicula.sinopsis}
                        />
                        <Form.Label className="fs-7 ms-2 mt-0 text-danger" style={{ display: displaySinopsis }}>
                            El campo Sinopsis es requerido. Se requiere un mínimo de 15 caracteres a un maximo de 80.
                        </Form.Label>
                    </Form.Group>
                    <Form.Group className="my-3 text-center" controlId="Form.ControlButton">
                        <Button variant="outline-dark" type="submit">
                            <i className="bi bi-film"></i> Guardar
                        </Button>
                    </Form.Group>
                </Form>
            </section>
            <section className="container mt-5">
                <h1 className="display-6 text-center text-light mt-3">
                    Lista de peliculas <i className="bi bi-camera-reels"></i>
                </h1>
                <hr className="mt-0 mx-5 text-light" />
                <ListaPeliculas listadoPeliculas={listadoPeliculas} />
            </section>
        </>
    );
};

export default Formulario;
