import type { NextFunction, Request, Response } from 'express-serve-static-core';
import { NotAuthorizedError } from '@/lib/errors';
import { CognitoService } from '../services';
import { User } from '@/types';

const cognitoService = new CognitoService();

export const isAuthenticated = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const accessToken = req.headers.authorization;
    if (!accessToken) {
      throw new NotAuthorizedError('Access token is missing');
    }

    const response = await cognitoService.validateAccessToken(accessToken);
    if (!response) {
      throw new NotAuthorizedError('Access token is invalid');
    }

    req.locals.user = {} as Pick<User, 'id'>;

    const id = response.sub as string;

    req.locals.user.id = id;

    return next();
  } catch (e: any) {
    req.locals.logging.middlewareErrorMessage = 'occurred during isAuthenticated middleware';
    return next(e);
  }
};
