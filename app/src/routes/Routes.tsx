import { Switch, Route, Redirect, useLocation } from 'react-router-dom';

import Projects from 'pages/Projects/Projects';
import NewProject from 'pages/NewProject/NewProject';
import Kanban from 'pages/Kanban/Kanban';
import ProjectSettings from 'pages/ProjectSettings/ProjectSettings';
import NotFound from 'pages/NotFound/NotFound';

const pathsFromAuth = ['/'];

export const useRoutes = () => {
  const location = useLocation();

  return (
    <Switch>
      <Route exact path="/projects" component={Projects} />
      <Route exact path="/projects/:id" component={Kanban} />
      <Route exact path="/projects/:id/project-settings" component={ProjectSettings} />
      <Route exact path="/new-project" component={NewProject} />

      {pathsFromAuth.includes(location.pathname) && <Redirect to="/projects" />}
      <Route component={NotFound} />
    </Switch>
  );
};
