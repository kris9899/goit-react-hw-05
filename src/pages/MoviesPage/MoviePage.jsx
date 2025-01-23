import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieList from '../../components/MovieList/MovieList';
import { getMoviesQuery } from '../../services/api';
import css from './MoviePage.module.css';

export default function MoviePage() {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState(searchParams.get('query') ?? '');
  const [error, setError] = useState(false);
  const query = searchParams.get('query') ?? '';

  useEffect(() => {
    async function getMovies(query) {
      setError(false);
      if (!query) return;
      try {
        const { results } = await getMoviesQuery(query);
        if (results.length === 0 && query) {
          setError('No movies found for the given query.');
        } else {
          setMovies(results);
        }
      } catch (error) {
        console.error('Error', error);
        setError('Failed to fetch movies. Please try again later.');
      }
    }
    getMovies(query);
  }, [query]);

  const handleSubmit = e => {
    e.preventDefault();
    const newQuery = e.target.elements.query.value.trim();
    if (newQuery) {
      setSearchParams({ query: newQuery });
    }
    setInputValue('');
  };

  const handleInputChange = e => {
    setInputValue(e.target.value);
  };

  return (
    <div className={css.wrap}>
      <form onSubmit={handleSubmit} className={css.moviePageForm}>
        <input
          type="text"
          name="query"
          value={inputValue}
          autoComplete="off"
          onChange={handleInputChange}
          className={css.MoviePageInput}
        />
        <button type="submit" className={css.MoviePageButton}>
          Search
        </button>
      </form>
      <MovieList movies={movies} />
    </div>
  );
}
