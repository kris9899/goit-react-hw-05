import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCastId } from '../../services/api';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

export default function MovieCast() {
  const [movieCast, setMovieCast] = useState([]);
  const { movieId } = useParams();
  const defaultImg =
    'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';

  useEffect(() => {
    const getMovieCastData = async id => {
      try {
        const { cast } = await getCastId(id);
        setMovieCast(cast);
      } catch (error) {
        console.error('Error');
      }
    };
    getMovieCastData(movieId);
  }, [movieId]);

  if (movieCast.length === 0) return <ErrorMessage />;

  return (
    <div>
      {movieCast.map(({ id, character, original_name, profile_path }) => (
        <div key={id}>
          <img
            src={
              profile_path
                ? `https://image.tmdb.org/t/p/w200/${profile_path}`
                : defaultImg
            }
            alt={original_name}
            width={100}
          />
          <h3>{original_name}</h3>
          <p>{character}</p>
        </div>
      ))}
    </div>
  );
}
