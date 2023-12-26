import { NextFunction, Request, Response } from 'express';

import { Prisma } from '@prisma/client';

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

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      statusCode = 409;
      message = "Unique constraint violation";
    } else if (err.code === "P2025") {
      statusCode = 404;
      message = "Record not found";
    }
  } else if (err instanceof Prisma.PrismaClientValidationError) {
    statusCode = 422;
    message = "Missing / Incorrect fields";
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
};
