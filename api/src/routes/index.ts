import { Application } from 'express';

import projectRoute from './project';

function routes(app: Application) {
  app.use('/api/project', projectRoute);
}

export default routes;
