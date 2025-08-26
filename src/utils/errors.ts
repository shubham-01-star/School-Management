export class AppError extends Error {
  public readonly status: number;
  public readonly code: string;

  constructor(message: string, status = 400, code = 'BAD_REQUEST') {
    super(message);
    this.status = status;
    this.code = code;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace?.(this, this.constructor);
  }
}

export const NotFound = (msg = 'Not found') => new AppError(msg, 404, 'NOT_FOUND');
export const Conflict = (msg = 'Conflict') => new AppError(msg, 409, 'CONFLICT');
export const Internal = (msg = 'Internal error') => new AppError(msg, 500, 'INTERNAL');
