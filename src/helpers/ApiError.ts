import { ValidationError } from 'express-validator';

export default class ApiError extends Error {
  status: number;
  message: string;
  errors: (Error | ValidationError)[];
  constructor(
    status: number,
    message: string,
    errors?: (Error | ValidationError)[]
  ) {
    super(message);
    this.status = status;
    this.message = message;
    this.errors = errors || [];
  }

  static badRequest(message: string) {
    return new ApiError(400, message);
  }
  static unauthorized(message: string) {
    return new ApiError(401, message);
  }
  static forbidden(message: string) {
    return new ApiError(403, message);
  }
  static notFound(message: string) {
    return new ApiError(404, message);
  }
  static internal(message: string) {
    return new ApiError(500, message);
  }
}
