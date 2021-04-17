import { useRoutes } from 'routes/Routes';

import './App.scss';

const App = () => {
  const routes = useRoutes();

  return <>{routes}</>;
};

export default App;
