import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import NavBar from 'layouts/NavBar/NavBar';
import MainLayout from 'layouts/MainLayout/MainLayout';

import CurrentTicket from 'pages/CurrentTicket/CurrentTicket';

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

      <Route path="/projects/:projectId/ticket/:ticketId" exact component={CurrentTicket} />
    </>
  );
};

export default Kanban;
