import crypto from 'crypto';
import type { Request, Response, NextFunction } from 'express-serve-static-core';

export const requestIdMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const requestId = crypto.randomUUID();
  req.locals = { logging: { requestId } } as Request['locals'];
  res.setHeader('X-Request-Id', requestId);
  next();
};
