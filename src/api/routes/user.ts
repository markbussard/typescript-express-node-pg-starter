import express from 'express';
import type { Router } from 'express-serve-static-core';
import { isAuthenticated, loadUser, validateRequest } from '../middlewares';
import { createUserSchema } from '../schemas';
import { UserService } from '../services';
import { User } from '@/types';

const userService = new UserService();

const route = express.Router();

export const userRoutes = (app: Router) => {
  app.use(route);

  route.post('/users', validateRequest(createUserSchema), async (req, res, next) => {
    try {
      const newUser = await userService.create(req.body);
      return res.status(201).send(newUser);
    } catch (e: any) {
      req.locals.logging.routeErrorMessage = 'occurred during users POST request handler';
      req.locals.logging.body = req.body;
      return next(e);
    }
  });

  route.get('/users/me', isAuthenticated, loadUser, (req, res) =>
    res.send(req.locals.user as User).status(200)
  );
};
