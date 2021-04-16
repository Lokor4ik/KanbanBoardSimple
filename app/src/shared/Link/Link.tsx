import { Link } from 'react-router-dom';

import { CustomLinkProps } from './types';

import './Link.scss';

const CustomLink: React.FC<CustomLinkProps> = ({ title, path, className }) => (
  <Link className={`link ${className}`} to={path}>
    {title}
  </Link>
);

export default CustomLink;
