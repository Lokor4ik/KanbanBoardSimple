import { Link, RouteComponentProps, withRouter } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';

import CustomLink from 'shared/Link/Link';

import { RouteInfo } from 'containers/Kanban/types';

import { KanbanHeaderTypes } from './types';

import './KanbanHeader.scss';

const KanbanHeader: React.FC<RouteComponentProps<RouteInfo> & KanbanHeaderTypes> = ({
  match,
  projectName,
  projectKey,
}) => (
  <div className="kanban__top">
    <div className="kanban__top-breadcrumb">
      <Breadcrumbs aria-label="breadcrumb">
        <Link className="breadcrumb__link" to="/projects">
          Projects
        </Link>

        <Typography className="breadcrumb__text">{projectName}</Typography>
      </Breadcrumbs>

      <Typography className="kanban__top-key">{projectKey}</Typography>
    </div>

    <CustomLink
      title="Project settings"
      path={`/projects/${match.params.id}/project-settings`}
      className="link--blue link--no-margins"
    />
  </div>
);

export default withRouter(KanbanHeader);
