import type { Express } from 'express-serve-static-core';
import { User } from '../user';

interface Logging {
  routeErrorMessage?: string;
  middlewareErrorMessage?: string;
  requestId: string;
  [key: string]: any;
}

declare module 'express-serve-static-core' {
  interface Request {
    locals: {
      logging: Logging;
      user: User | Pick<User, 'id'>;
    };
  }
}
