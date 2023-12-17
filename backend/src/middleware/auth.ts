import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { PrismaClient } from '@prisma/client';

const prisma: PrismaClient = new PrismaClient();

const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt;

    if (token) {
      try {
        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET!
        ) as JwtPayload;
        req.user = await prisma.user.findUnique({
          where: {
            id: decoded.userId,
          },
          select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true,
          },
        });
        next();
      } catch (error) {
        res.status(401);
        throw new Error("Not authorized, invalid token");
      }
    } else {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  }
);

export default protect;
