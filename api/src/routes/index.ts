import { Application } from 'express';

import authRoute from './auth';
import userRoute from './user';
import projectRoute from './project';

function routes(app: Application) {
  app.use('/api/auth', authRoute);
  app.use('/api/user', userRoute);
  app.use('/api/project', projectRoute);
}

export default routes;
