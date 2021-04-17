import { Link } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';

const NewProjectHeader = () => (
  <Breadcrumbs aria-label="breadcrumb">
    <Link className="breadcrumb__link" to="/projects">
      Projects
    </Link>

    <Typography className="breadcrumb__text">New project</Typography>
  </Breadcrumbs>
);

export default NewProjectHeader;
