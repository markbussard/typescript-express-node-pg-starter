import type { NextFunction, Request, Response } from 'express-serve-static-core';
import { DatabaseError } from 'pg';
import { ZodError } from 'zod';
import { CustomError } from '@/lib/errors';
import { Logger } from '@/lib/logger';

export const errorHandler = async (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) => {
  const { routeErrorMessage, middlewareErrorMessage, ...rest } = req.locals.logging;

  const loggerMessage =
    middlewareErrorMessage || routeErrorMessage || 'An unexpected error occurred';

  const additionalInfo: any = {
    method: req.method,
    path: req.path,
    ...rest
  };

  if (req.locals.user) {
    additionalInfo.userId = req.locals.user.id;
  }

  if (err instanceof CustomError) {
    additionalInfo.error = {
      status: err.status
    };
    Logger.error(`${loggerMessage}: %s`, err.message, {
      additionalInfo
    });
    return res.status(err.status).json({
      error: {
        message: err.message
      }
    });
    // Validation schema failed for request body / query / params
  } else if (err instanceof ZodError) {
    Logger.error(`${loggerMessage}: %s`, err.message, { additionalInfo });
    return res.status(400).json({
      error: err.format()
    });
  } else if (err instanceof DatabaseError) {
    Logger.error(
      `${loggerMessage}: %o`,
      { message: err.message, code: err.code, severity: err.severity, stack: err.stack },
      {
        additionalInfo
      }
    );
  } else {
    Logger.error(`${loggerMessage}: %s`, err.stack, { additionalInfo });
  }
  return res.status(500).json({
    error: { message: 'An unexpected error occurred' }
  });
};
