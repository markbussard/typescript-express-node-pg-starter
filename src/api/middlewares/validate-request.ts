import type { NextFunction, Request, Response } from 'express-serve-static-core';
import { AnyZodObject } from 'zod';

export const validateRequest =
  (schema: AnyZodObject) => async (req: Request, _res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params
      });
      return next();
    } catch (e: any) {
      req.locals.logging = {
        ...req.locals.logging,
        middlewareErrorMessage: 'occurred during validateRequest middleware',
        body: req.body,
        query: req.query,
        params: req.params
      };
      return next(e);
    }
  };
