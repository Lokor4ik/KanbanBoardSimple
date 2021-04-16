import MainLayout from 'layouts/MainLayout/MainLayout';
import NewProjectContainer from 'containers/NewProject/NewProject';

const NewProject = () => (
  <MainLayout sectionName="new-project">
    <NewProjectContainer />
  </MainLayout>
);

export default NewProject;
