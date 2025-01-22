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
    <div>
      <Link to={previousPage}>Go back</Link>
      <div>
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
        />
        <div>
          <h3>{movie.title}</h3>
          <p>{movie.overview}</p>
        </div>
      </div>
      <nav>
        <NavLink to="cast" state={previousPage}>
          Cast
        </NavLink>
        <NavLink to="reviews" state={previousPage}>
          Reviews
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
}
