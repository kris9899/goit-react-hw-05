import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getReviewsId } from '../../services/api';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import css from './MovieReviews.module.css';

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
    <div className={css.reviewsWrapper}>
      <h3 className={css.title}>Reviews</h3>
      <ul className={css.reviewsList}>
        {movieReviews.map(({ id, author, content }) => (
          <li key={id} className={css.reviewsItem}>
            <h4 className={css.reviewsName}>{author}</h4>
            <p className={css.reviewsText}>{content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
