import { useSelector } from 'react-redux';

import NavBar from 'layouts/NavBar/NavBar';
import MainLayout from 'layouts/MainLayout/MainLayout';

import ProjectSettingsContainer from 'containers/ProjectSettings/ProjectSettings';

import ProjectSettingsHeader from 'components/ProjectSettingsHeader/ProjectSettingsHeader';

import { RootState } from 'store/types';

const ProjectSettings = () => {
  const { currentProject } = useSelector((state: RootState) => state.projects);

  return (
    <>
      <NavBar>
        <ProjectSettingsHeader projectName={currentProject.name} />
      </NavBar>

      <MainLayout sectionName="project-settings">
        <ProjectSettingsContainer />
      </MainLayout>
    </>
  );
};

export default ProjectSettings;
