import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div>
      <p> The page you requested was not found.</p>
      <Link to="/">Go back</Link>
    </div>
  );
}
