import NavBar from 'shared/NavBar/NavBar';

import { useRoutes } from 'routes/Routes';

import './App.scss';

const App = () => {
  const routes = useRoutes();

  return (
    <main className="main">
      <NavBar />

      {routes}
    </main>
  );
};

export default App;
