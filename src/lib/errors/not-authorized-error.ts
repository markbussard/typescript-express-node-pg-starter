import { CustomError } from './custom-error';

export class NotAuthorizedError extends CustomError {
  status = 401;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }
}
