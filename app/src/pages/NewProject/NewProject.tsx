import NavBar from 'layouts/NavBar/NavBar';
import MainLayout from 'layouts/MainLayout/MainLayout';

import NewProjectContainer from 'containers/NewProject/NewProject';

import NewProjectHeader from 'components/NewProjectHeader/NewProjectHeader';

const NewProject = () => (
  <>
    <NavBar>
      <NewProjectHeader />
    </NavBar>

    <MainLayout sectionName="new-project">
      <NewProjectContainer />
    </MainLayout>
  </>
);

export default NewProject;
