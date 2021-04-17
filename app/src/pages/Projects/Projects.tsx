import NavBar from 'layouts/NavBar/NavBar';
import MainLayout from 'layouts/MainLayout/MainLayout';

import ProjectsContainer from 'containers/Projects/Projects';

import ProjectsHeader from 'components/ProjectsHeader/ProjectsHeader';

const Projects = () => (
  <>
    <NavBar>
      <ProjectsHeader />
    </NavBar>

    <MainLayout sectionName="projects">
      <ProjectsContainer />
    </MainLayout>
  </>
);

export default Projects;
