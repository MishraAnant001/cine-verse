const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchMovies = async (page = 1, genres = []) => {
    const genreQueryString = genres.length ? `&with_genres=${genres.join(',')}` : '';
    const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&page=${page}${genreQueryString}`);
    const data = await response.json();
    return { results: data.results, totalPages: data.total_pages };
}

export const searchMovies = async (query, page = 1) => {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`);
    const data = await response.json();
    return { results: data.results, totalPages: data.total_pages };
}

export const fetchGenres = async () => {
    const res = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
    const data = await res.json();
    return data.genres;
}