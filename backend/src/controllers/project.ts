import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

import { PrismaClient } from '@prisma/client';

const prisma: PrismaClient = new PrismaClient();

// @desc    Get all projects for current user
// @route   GET project
// @access  Private
export const getProjects = asyncHandler(async (req: Request, res: Response) => {
  const projects = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    select: {
      projects: true,
    },
  });
  res.status(200).send(projects);
});

// @desc    Get single project
// @route   GET project/:id
// @access  Private
export const getProject = asyncHandler(async (req: Request, res: Response) => {
  const project = await prisma.project.findUnique({
    where: {
      id: req.params.id,
    },
    include: {
      tasks: true,
    },
  });
  if (project) {
    res.status(200).send(project);
  } else {
    res.status(404);
    throw new Error("Project not found");
  }
});

// @desc    Create new project
// @route   POST project
// @access  Private
export const createProject = asyncHandler(
  async (req: Request, res: Response) => {
    // check if project name is unique at user level
    const isUnique = await prisma.project.findFirst({
      where: {
        name: req.body.name,
        userId: req.user.id,
      },
    });

    if (!isUnique) {
      const project = await prisma.project.create({
        data: {
          name: req.body.name,
          user: {
            connect: {
              id: req.user.id,
            },
          },
        },
      });
      res.status(201).send(project);
    } else {
      res.status(409);
      throw new Error("Project name already exists");
    }
  }
);

// @desc    Update project
// @route   PUT project/:id
// @access  Private
export const updateProject = asyncHandler(
  async (req: Request, res: Response) => {
    // check if project name is unique at user level
    const isUnique = await prisma.project.findFirst({
      where: {
        name: req.body.name,
        userId: req.user.id,
      },
    });

    if (!isUnique) {
      const project = await prisma.project.update({
        where: {
          id: req.params.id,
        },
        data: {
          name: req.body.name,
        },
      });
      res.status(201).send(project);
    } else {
      res.status(409);
      throw new Error("Project name already exists");
    }
  }
);

// @desc    Delete project
// @route   DELETE project/:id
// @access  Private
export const deleteProject = asyncHandler(
  async (req: Request, res: Response) => {
    await prisma.project.delete({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).send({ message: "Project deleted" });
  }
);
