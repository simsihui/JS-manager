import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { produce } from 'immer';

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
      projects: {
        orderBy: {
          updatedAt: "desc",
        },
      },
    },
  });
  res.status(200).send(projects?.projects);
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
      tasks: {
        include: {
          tags: true,
        },
      },
      tags: true,
    },
  });

  // For the UI in frontend:
  // convert  tags: {taskId: string, label: string, selected: string[]}[]
  // to       {label1: selected1, label2: selected2 ...}
  if (project) {
    const tagsDict = project?.tags?.reduce(
      (acc, tag) => ({
        ...acc,
        [tag.id]: tag.label,
      }),
      {} as { [key: string]: string }
    );

    const transformed = produce(project, (draftState) => {
      if (draftState?.tasks?.length)
        draftState.tasks.forEach((task) => {
          if (task?.tags?.length) {
            task.tags.forEach((tag) => {
              (task as any)[tagsDict[tag.tagId]] = tag.selected;
            });
          }
        });
    });
    res.status(200).send(transformed);
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
    const projectName = req?.body?.name.replace(/\s/g, "-");
    const isUnique = await prisma.project.findFirst({
      where: {
        name: projectName,
        userId: req.user.id,
      },
    });

    if (!isUnique) {
      const project = await prisma.project.create({
        data: {
          name: projectName,
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
    const projectName = req?.body?.name.replace(/\s/g, "-");
    const isUnique = await prisma.project.findFirst({
      where: {
        name: projectName,
        userId: req.user.id,
      },
    });

    if (!isUnique) {
      const project = await prisma.project.update({
        where: {
          id: req.body.id,
        },
        data: {
          name: projectName,
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
