import 'dotenv/config';

import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

import { PrismaClient } from '@prisma/client';

import generateToken from '../utils/generateToken';

const prisma: PrismaClient = new PrismaClient();

// @desc    Auth user / Get token
// @route   POST user/auth
// @access  Public
export const authUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      projects: {
        where: {
          name: email.split("@")[0],
        },
        select: { id: true },
      },
    },
  });

  // ensures user exists and password matches
  if (user && (await verifyPassword(password, user.password))) {
    generateToken(res, user.id);
    res.status(200).send({
      id: user.id,
      name: user.name,
      email: user.email,
      defaultProject: user.projects[0]?.id,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email / password");
  }
});

// @desc    Register a new user
// @route   POST user/register
// @access  Public
export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // check if user exists
    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) {
      res.status(409);
      throw new Error("User already exists");
    }

    // create user
    const user = await prisma.user.create({
      data: {
        name: email.split("@")[0],
        email,
        password: await hashPassword(password),
        projects: {
          create: {
            name: email.split("@")[0], // create default project where name === username
          },
        },
      },
    });

    // ensures user is created before sending a response
    if (user) {
      const defaultProject = await prisma.project.findFirst({
        where: {
          userId: user.id,
          name: user.name!,
        },
      });
      generateToken(res, user.id);
      res.status(201).send({
        id: user.id,
        name: user.name,
        email: user.email,
        defaultProject: defaultProject?.id,
      });
    } else {
      res.status(500);
      throw new Error("Something went wrong");
    }
  }
);

// @desc    Logout user
// @route   POST user/logout
// @access  Public
export const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0), // expire immediately
  });

  res.status(200).send({ message: "User logged out" });
});

// @desc    Get user
// @route   GET user
// @access  Private
export const getUser = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;
  res.status(200).send(user);
});

// @desc    Update user
// @route   PUT user
// @access  Private
export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({ where: { id: req.user.id } });

  if (user) {
    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        name: req.body.name || user.name,
        email: req.body.email || user.email,
        password: req.body.password
          ? await hashPassword(req.body.password)
          : user.password,
      },
    });

    res.status(200).send({
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// hash password using bcrypt
const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(+process.env.SALT_ROUNDS!);
  return await bcrypt.hash(password, salt);
};

// verify password
const verifyPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};
