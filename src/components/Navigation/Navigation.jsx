import { NavLink } from 'react-router-dom';
import Container from '../Container/Container';
import clsx from 'clsx';

// const buildLinkClass = ({ isActive }) => {
//   return clsx(css.link, isActive && css.active);
// };
const Navigation = () => {
  return (
    <Container>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/movies">Movies</NavLink>
      </nav>
    </Container>
  );
};

export default Navigation;
