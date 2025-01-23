import { useEffect, useState } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import { getTrendingMovies } from '../../services/api';
import css from './HomePage.module.css';

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function getMovies(page = 1) {
      try {
        const { results } = await getTrendingMovies(page);
        setMovies(results);
      } catch (error) {
        console.error('Error');
      }
    }
    getMovies();
  }, []);

  return (
    <section className={css.wrap}>
      <h2 className={css.title}>Trending today</h2>
      <MovieList movies={movies} />
    </section>
  );
}
