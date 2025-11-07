import "../css/MovieCard.css";
import { useMovieContext } from "../contexts/FavouriteContext";
function MovieCard({ movie }) {
    const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
    const favourite = isFavorite(movie.id);

    function onFavouriteClick(e) {
        e.preventDefault();
        favourite ? removeFromFavorites(movie.id) : addToFavorites(movie);
    }

    const genreMap = {
        28: "Action",
        12: "Adventure",
        16: "Animation",
        35: "Comedy",
        80: "Crime",
        99: "Documentary",
        18: "Drama",
        10751: "Family",
        14: "Fantasy",
        36: "History",
        27: "Horror",
        10402: "Music",
        9648: "Mystery",
        10749: "Romance",
        878: "Science Fiction",
        10770: "TV Movie",
        53: "Thriller",
        10752: "War",
        37: "Western"
    };

    function StarIcon() {
        return (
            <svg width="1em" height="1em" fill="gold" viewBox="0 0 24 24">
                <path d="M12 .587l3.668 7.568L24 9.763l-6 5.814 
      1.42 8.543L12 18.896 4.58 24.12 
      6 15.576 0 9.763l8.332-1.608z" />
            </svg>
        );
    }

    const genres = movie.genre_ids.map(id => genreMap[id] || id);

    return (
        <div className="movie-card">
            <div className="movie-poster">
                <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                    loading="lazy"
                />
                <div className="movie-overlay">
                    <div className="movie-overview">{movie.overview}</div>
                    <button
                        className={`favorite-btn ${favourite ? "active" : ""}`}
                        onClick={onFavouriteClick}
                        aria-label="favorite"
                        title="Add to favorites"
                    >
                        ♥
                    </button>
                </div>
            </div>
            <div className="movie-info">
                <h3>{movie.title}</h3>
                <div className="movie-genres">
                    {genres.map((g, i) => (
                        <span className="genre-chip" key={i}>
                            {g}
                        </span>
                    ))}
                </div>
                <div className="movie-meta">
                    <span className="movie-release">{movie.release_date?.split("-")[0]}</span>
                    <span className="movie-rating">
                        <StarIcon /> {movie.vote_average?.toFixed(1)}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default MovieCard;
