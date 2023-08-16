import { Router } from 'express';
import { userRoutes } from './user';

export const routes = () => {
  const app = Router();
  userRoutes(app);
  return app;
};
