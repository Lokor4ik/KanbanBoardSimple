import { useSelector } from 'react-redux';

import NavBar from 'layouts/NavBar/NavBar';
import MainLayout from 'layouts/MainLayout/MainLayout';

import KanbanContainer from 'containers/Kanban/Kanban';

import KanbanHeader from 'components/KanbanHeader/KanbanHeader';

import { RootState } from 'store/types';

const Kanban = () => {
  const { currentProject } = useSelector((state: RootState) => state.projects);

  return (
    <>
      <NavBar>
        <KanbanHeader projectName={currentProject.name} projectKey={currentProject.key} />
      </NavBar>

      <MainLayout sectionName="kanban">
        <KanbanContainer />
      </MainLayout>
    </>
  );
};

export default Kanban;
