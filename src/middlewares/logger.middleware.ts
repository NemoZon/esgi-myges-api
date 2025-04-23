import { NextFunction, Request, Response } from 'express';

export default function loggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const date = new Date();
    let logData = `${date.toISOString()} - ${req.method} - ${req.url}\n`;

    res.on('finish', () => {
      if (res.statusCode >= 400) {
        logData = `${date.toISOString()} - ERROR - ${req.method} - ${req.url} - Status: ${res.statusCode}\n`;
      }
    });

    console.log(logData);
    next();
  } catch (error) {
    console.log(error);
  }
}
