import { NextFunction, Request, Response } from 'express';

// catch all routes
export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// catch errors
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  if (err.name === "PrismaClientKnownRequestError") {
    statusCode = 409;
    message = "Unique constraint violation";
  } else if (err.name === "PrismaClientValidationError") {
    statusCode = 422;
    message = "Missing / Incorrect fields";
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
};
