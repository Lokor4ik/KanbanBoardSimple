import { NavBarProps } from './types';

import './NavBar.scss';

const NavBar: React.FC<NavBarProps> = ({ children }) => (
  <header className="header">
    <div className="header__wrapper">{children}</div>
  </header>
);

export default NavBar;
