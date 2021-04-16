import { Link, useLocation } from 'react-router-dom';

import UserMenu from 'components/UserMenu/UserMenu';

import { NavBarProps } from './types';

import './NavBar.scss';

const NavBar: React.FC<NavBarProps> = ({ isAuthenticated }) => {
  const location = useLocation();

  const navLinks = (
    <ul className="navbar__buttons">
      {isAuthenticated && (
        <>
          <li>
            <UserMenu />
          </li>
        </>
      )}
      {!isAuthenticated && location.pathname === '/' && (
        <>
          <li>
            <Link to="/signin" className="signin">
              Sign In
            </Link>
          </li>
          <li>
            <Link to="/signup" className="signup">
              Sign Up
            </Link>
          </li>
        </>
      )}
    </ul>
  );

  return (
    <header className="header">
      <div className="header__wrapper">
        <nav className="navbar">
          <Link className="navbar__homepage" to="/">
            Kanban
          </Link>

          {navLinks}
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
