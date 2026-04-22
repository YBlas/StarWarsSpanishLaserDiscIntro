
import "./FilmPoster.css";


const FilmPoster = ({ idFilm, setId }: { idFilm: number, setId: (id: number) => void }) => {
    const posterUrl = `estarguarras/${idFilm}.jpg`;

    return (
        <div className="FilmPosterContainer" onClick={() => setId(idFilm)}>
            <img src={posterUrl} alt={`Poster of film ${idFilm}`} />
        </div>  
    );
}

export default FilmPoster;