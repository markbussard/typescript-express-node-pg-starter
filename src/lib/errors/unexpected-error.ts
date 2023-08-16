import { CustomError } from './custom-error';

export class UnexpectedError extends CustomError {
  status = 500;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, UnexpectedError.prototype);
  }
}
