import type { NextFunction, Request, Response } from 'express-serve-static-core';
import { pool } from '@/db';
import { NotAuthorizedError } from '@/lib/errors';
import { Logger } from '@/lib/logger';
import { User } from '@/types';
import { UserService } from '../services';

const userService = new UserService();

export const loadUser = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const userData = await userService.getById(req.locals.user.id);
    if (!userData) {
      throw new NotAuthorizedError('No user found with the provided access token');
    }
    req.locals.user = { ...userData };
    return next();
  } catch (e: any) {
    req.locals.logging.middlewareErrorMessage = 'occurred during loadUser middleware';
    return next(e);
  }
};
