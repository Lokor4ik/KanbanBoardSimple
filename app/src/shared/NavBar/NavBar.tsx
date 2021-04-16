import { Link } from 'react-router-dom';

import './NavBar.scss';

const NavBar = () => (
  <header className="header">
    <div className="header__wrapper">
      <nav className="navbar">
        <Link className="navbar__homepage" to="/">
          Kanban
        </Link>
      </nav>
    </div>
  </header>
);

export default NavBar;
