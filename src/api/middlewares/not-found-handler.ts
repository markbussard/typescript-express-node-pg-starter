import type { NextFunction, Request, Response } from 'express-serve-static-core';
import { NotFoundError } from '@/lib/errors';

export const notFoundHandler = (req: Request, _res: Response, next: NextFunction) => {
  req.locals.logging.middlewareErrorMessage = 'invalid route requested';
  return next(new NotFoundError("Requested route doesn't exist"));
};
