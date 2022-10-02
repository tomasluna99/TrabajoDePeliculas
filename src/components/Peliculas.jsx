import Card from "react-bootstrap/Card";
const Pelicula = ({ movie }) => {
    return (
        <>
            <article className="col-12 col-md-4 mt-3 bg-ligth altura">
                <Card className="h-100">
                    <Card.Body>
                        <Card.Title className="lead">
                            <i className="bi bi-film"></i> {movie.titulo}
                        </Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{movie.categoria}</Card.Subtitle>
                        <Card.Text>{movie.sinopsis}</Card.Text>
                    </Card.Body>
                </Card>
            </article>
        </>
    );
};

export default Pelicula;
