import Typography from '@material-ui/core/Typography';

import CustomLink from 'shared/Link/Link';

import './ProjectsHeader.scss';

const ProjectsHeader = () => (
  <div className="projects__top">
    <Typography variant="h6" className="projects__title">
      Projects
    </Typography>

    <CustomLink
      title="Create a new project"
      path="/new-project"
      className="link--blue link--no-margins"
    />
  </div>
);

export default ProjectsHeader;
