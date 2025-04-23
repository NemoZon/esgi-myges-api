/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { ValidationError } from 'express-validator';
import ApiError from '../helpers/ApiError';

export default function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction // important to have all four parameters
) {
  let status = 500;
  let message = 'Unexpected error';
  let errors: (Error | ValidationError)[] = [];

  if (err instanceof ApiError) {
    status = err.status;
    message = err.message;
    errors = err.errors;
  }

  res.status(status).json({
    message,
    errors
  });
}
