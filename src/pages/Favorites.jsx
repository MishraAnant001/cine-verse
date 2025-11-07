import "../css/Favorites.css"
import { useMovieContext } from "../contexts/FavouriteContext";
import MovieCard from "../components/MovieCard";

function Favorites() {
    const { favourites } = useMovieContext();
    return (
        <div className="favorites-page">
            <header className="favorites-header">
                <h1>
                    <span role="img" aria-label="heart" style={{ color: "#ff4757", marginRight: "0.4em" }}>❤️</span>
                    My Favorite Movies
                </h1>
                <p className="favorites-subtitle">Your curated movie watchlist</p>
            </header>
            {favourites.length > 0 ? (
                <div className='movies-grid'>
                    {favourites.map(movie => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            ) : (
                <div className='favorites-empty'>
                    <h2>No favorites yet</h2>
                    <p>Add some movies to your favorites list</p>
                </div>
            )}
        </div>
    )
}

export default Favorites;
