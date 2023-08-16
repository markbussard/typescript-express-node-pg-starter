import { CustomError } from './custom-error';

export class NotFoundError extends CustomError {
  status = 404;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}
