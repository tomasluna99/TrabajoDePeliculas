import Peliculas from "./Peliculas";

const ListaPeliculas = ({ listadoPeliculas }) => {
    return (
        <>
            <section className="container row justify-content-center">
                {listadoPeliculas.map((elemento, posicion) => (
                    <Peliculas key={posicion} movie={elemento} />
                ))}
            </section>
        </>
    );
};

export default ListaPeliculas;
