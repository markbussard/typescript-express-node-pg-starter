import type { Request } from 'express-serve-static-core';
import morgan, { StreamOptions } from 'morgan';
import { Logger } from '@/lib/logger';

morgan.token('requestId', (req: Request) => req.locals.logging.requestId);

const stream: StreamOptions = {
  write: (message) => Logger.http(message)
};

export const morganMiddleware = morgan(
  ':requestId :method :url :res[content-length] - :response-time ms',
  { stream }
);
