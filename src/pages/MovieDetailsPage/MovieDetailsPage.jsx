import { useEffect, useState } from 'react';
import {
  Link,
  NavLink,
  Outlet,
  useNavigate,
  useLocation,
  useParams,
} from 'react-router-dom';
import { getMovieId } from '../../services/api';
import css from './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const location = useLocation();

  const previousPage = location.state ?? '/movies';

  useEffect(() => {
    async function getMovie(id) {
      try {
        const results = await getMovieId(id);
        setMovie(results);
      } catch (error) {
        console.error('Error');
      }
    }
    getMovie(movieId);
  }, [movieId]);

  if (!movie) return null;

  return (
    <div className={css.wrapper}>
      <Link to={previousPage} className={css.Link}>
        Go back
      </Link>
      <div className={css.imgWrapper}>
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
          className={css.img}
        />
        <div className={css.infoWrapper}>
          <h3 className={css.title}>{movie.title}</h3>
          <p className={css.overview}>{movie.overview}</p>
        </div>
      </div>
      <nav className={css.nav}>
        <h2 className={css.addInfo}>Additional information</h2>
        <div className={css.transition}>
          <NavLink to="cast" state={previousPage} className={css.navLink}>
            Cast
          </NavLink>
          <NavLink to="reviews" state={previousPage} className={css.navLink}>
            Reviews
          </NavLink>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}
