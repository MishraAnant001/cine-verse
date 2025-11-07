import { createContext, useContext, useEffect, useState } from "react";

const MovieContext = createContext()

export const useMovieContext = () => useContext(MovieContext)

export const MovieProvider = ({ children }) => {
    const [favourites, setFavourites] = useState(() => {
        const fav = localStorage.getItem("favourites");
        return fav ? JSON.parse(fav) : [];
    });

    useEffect(() => {
        const favouriteMovies = localStorage.getItem("favourites");
        if (favouriteMovies) {
            setFavourites(JSON.parse(favouriteMovies));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("favourites", JSON.stringify(favourites));
    }, [favourites]);

    const addToFavorites = (movie) => {
        setFavourites(prev => [...prev, movie]);
    }

    const removeFromFavorites = (movieId) => {
        setFavourites(prev => prev.filter((m) => m.id !== movieId));
    }

    const isFavorite = (movieId) => {
        return favourites.some((m) => m.id === movieId);
    }

    const value = {
        favourites,
        addToFavorites,
        removeFromFavorites,
        isFavorite
    }

    return (
        <MovieContext.Provider value={value}>
            {children}
        </MovieContext.Provider>
    )
}