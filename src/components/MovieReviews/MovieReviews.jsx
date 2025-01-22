import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getReviewsId } from '../../services/api';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

export default function MovieReviews() {
  const [movieReviews, setMovieReviews] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    const getMovieReviewsData = async id => {
      try {
        const { results } = await getReviewsId(id);
        setMovieReviews(results);
      } catch (error) {
        console.error('Error');
      }
    };
    getMovieReviewsData(movieId);
  }, [movieId]);

  if (movieReviews.length === 0) return <ErrorMessage />;

  return (
    <div>
      {movieReviews.map(({ id, author, content }) => (
        <div key={id}>
          <h4>{author}</h4>
          <p>{content}</p>
        </div>
      ))}
    </div>
  );
}
