/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import MovieCard from '../components/MovieCard'
import "../css/Home.css"
import { searchMovies, fetchMovies, fetchGenres } from "../services/api"
import Loader from '../components/Loader'
import { useDebounce } from "../hooks/useDebounce"
import Select from "react-select";

function Home() {
    const [searchQuery, setSearchQuery] = useState('')
    const [movies, setMovies] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);

    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    useEffect(() => {
        async function fetchAllGenres() {
            const data = await fetchGenres();
            setGenres(data);
        }
        fetchAllGenres();
    }, []);

    useEffect(() => {
        let isCancelled = false;
        const fetchAllMovies = async () => {
            setLoading(true);
            setError(null);
            try {
                let response;
                if (!debouncedSearchQuery.trim()) {
                    response = await fetchMovies(page, selectedGenres);
                } else {
                    response = await searchMovies(debouncedSearchQuery, page);
                }
                if (!isCancelled) {
                    if (page === 1) {
                        setMovies(response.results);
                    } else {
                        setMovies(prev => [...prev, ...response.results]);
                    }
                    setHasMore(page < response.totalPages);
                }
            } catch (err) {
                if (!isCancelled) setError("Error fetching movies");
            } finally {
                if (!isCancelled) setLoading(false);
            }
        };
        fetchAllMovies();
        return () => { isCancelled = true; }
    }, [debouncedSearchQuery, page, selectedGenres]);

    useEffect(() => {
        setPage(1);
    }, [searchQuery]);

    useEffect(() => {
        if (!hasMore || loading) return;
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) setPage(prev => prev + 1);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasMore, loading]);

    const genreOptions = genres.map(g => ({ value: g.id, label: g.name }));
    function handleGenreChange(selectedOptions) {
        setSelectedGenres(selectedOptions.map(opt => opt.value));
    }

    return (
        <div className='home'>
            <div className='search-form'>
                <input
                    type='text'
                    placeholder='Search for a movie...'
                    className='search-input'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div className="genres-filter">
                <Select
                    closeMenuOnSelect={false}
                    options={genreOptions}
                    isMulti
                    isClearable
                    placeholder="Select genres..."
                    onChange={handleGenreChange}
                    value={genreOptions.filter(opt => selectedGenres.includes(opt.value))}
                    className="genre-multiselect"
                    styles={{
                        menu: (base) => ({
                            ...base,
                            backgroundColor: "#1e1e1e", // dark menu background
                            color: "#fff",
                            zIndex: 9999, // ensure it's above other elements
                        }),
                        option: (base, state) => ({
                            ...base,
                            backgroundColor: state.isFocused
                                ? "#333"   // when hovering
                                : "#1e1e1e",
                            color: "#fff",
                            cursor: "pointer",
                        }),
                        multiValue: (base) => ({
                            ...base,
                            backgroundColor: "#333",
                            color: "#fff",
                        }),
                        multiValueLabel: (base) => ({
                            ...base,
                            color: "#fff",
                        }),
                        control: (base) => ({
                            ...base,
                            backgroundColor: "#2b2b2b",
                            color: "#fff",
                            borderColor: "#444",
                        }),
                        singleValue: (base) => ({
                            ...base,
                            color: "#fff",
                        }),
                    }}
                />
            </div>
            {error && <div className='error'>{error}</div>}
            {<div className='movies-grid'>
                {movies.map(movie => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>}
            {loading && <Loader />}
            {/* {hasMore && <button className='load-more' onClick={() => setPage(page + 1)}>Load More</button>} */}
            {!hasMore && !loading && movies.length > 0 && (
                <div className="no-more-movies">
                    <span role="img" aria-label="popcorn" style={{ fontSize: "2rem" }}>🍿</span>
                    <div>No more movies to show!</div>
                    <small style={{ color: "#ff4757cc", fontWeight: "500" }}>
                        You’ve reached the end of this list.
                    </small>
                </div>
            )}
        </div>
    )
}

export default Home