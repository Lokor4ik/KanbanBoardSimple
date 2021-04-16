import { Switch, Route, Redirect, useLocation } from 'react-router-dom';

import Projects from 'pages/Projects/Projects';
import NewProject from 'pages/NewProject/NewProject';
import Kanban from 'pages/Kanban/Kanban';
import ProjectSettings from 'pages/ProjectSettings/ProjectSettings';
import ProjectParticipants from 'pages/ProjectParticipants/ProjectParticipants';
import NotFound from 'pages/NotFound/NotFound';
import Landing from 'pages/Landing/Landing';
import SignUp from 'pages/SignUp/SignUp';
import SignIn from 'pages/SignIn/SignIn';

const pathsFromAuth = ['/signin', '/signup', '/'];

export const useRoutes = (isAuthenticated: boolean) => {
  const location = useLocation();

  if (isAuthenticated) {
    return (
      <Switch>
        <Route exact path="/projects" component={Projects} />
        <Route exact path="/projects/:id" component={Kanban} />
        <Route exact path="/projects/:id/project-settings" component={ProjectSettings} />
        <Route exact path="/projects/:id/project-participants" component={ProjectParticipants} />
        <Route exact path="/new-project" component={NewProject} />
        {pathsFromAuth.includes(location.pathname) && <Redirect to="/projects" />}
        <Route component={NotFound} />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/signin" component={SignIn} />
      <Redirect from="/projects*" to="/signin" />
      <Route component={NotFound} />
    </Switch>
  );
};
