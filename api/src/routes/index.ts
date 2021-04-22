import { Application } from 'express';

import projectRoute from './project';
import ticketRoute from './ticket';

function routes(app: Application) {
  app.use('/api/project', projectRoute);
  app.use('/api/ticket', ticketRoute);
}

export default routes;
