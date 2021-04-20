import { Application } from 'express';

import projectRoute from 'routes/project';
import ticketRoute from 'routes/ticket';

function routes(app: Application) {
  app.use('/api/project', projectRoute);
  app.use('/api/ticket', ticketRoute);
}

export default routes;
