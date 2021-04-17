import { Link, RouteComponentProps, withRouter } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';

import { RouteInfo } from 'containers/Kanban/types';

import { ProjectSettingsHeaderTypes } from './types';

const ProjectSettingsHeader: React.FC<
  RouteComponentProps<RouteInfo> & ProjectSettingsHeaderTypes
> = ({ match, projectName }) => (
  <Breadcrumbs aria-label="breadcrumb">
    <Link className="breadcrumb__link" to="/projects">
      Projects
    </Link>

    <Link className="breadcrumb__link" to={`/projects/${match.params.id}`}>
      {projectName}
    </Link>

    <Typography className="breadcrumb__text">Project settings</Typography>
  </Breadcrumbs>
);

export default withRouter(ProjectSettingsHeader);
