import { CustomError } from './custom-error';

export class BadRequestError extends CustomError {
  status = 400;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}
