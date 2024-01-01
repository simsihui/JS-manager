import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

import { PrismaClient } from '@prisma/client';

const prisma: PrismaClient = new PrismaClient();

// @desc    Get task
// @route   GET task/:id
// @access  Private
export const getTask = asyncHandler(async (req: Request, res: Response) => {
  const task = await prisma.task.findUnique({
    where: {
      id: req.params.id,
    },
    include: {
      tags: true,
    },
  });
  if (task) {
    res.status(200).send(task);
  } else {
    res.status(404);
    throw new Error("Record not found");
  }
});

// @desc    Create new task
// @route   POST task
// @access  Private
export const createTask = asyncHandler(async (req: Request, res: Response) => {
  // To create "tagLabel" and "selected" columns in TaskTag table:
  // convert  tags: { tagId1: selected1, tagId2: selected2 ... }
  // to       tags: { tagId: string; selected: string[] }[]
  let convertedTags;
  if (req.body.tags) {
    convertedTags = Object.entries(req.body.tags).map(([tagId, selected]) => ({
      tagId,
      selected: typeof selected === "string" ? [selected] : selected,
    }));
  }

  const projects = await prisma.task.create({
    data: {
      title: req.body.title,
      content: req?.body?.content,
      project: {
        connect: {
          id: req.body.projectId,
        },
      },
      tags: {
        create: convertedTags as { tagId: string; selected: string[] }[],
      },
    },
  });
  res.status(200).send(projects);
});

// @desc    Update task
// @route   PUT task/:id
// @access  Private
export const updateTask = asyncHandler(async (req: Request, res: Response) => {
  const task = await prisma.task.update({
    where: {
      id: req.body.id,
    },
    data: {
      title: req?.body?.title,
      content: req?.body?.content,
    },
  });
  res.status(200).send(task);
});

// @desc    Delete task
// @route   DELETE task/:id
// @access  Private
export const deleteTask = asyncHandler(async (req: Request, res: Response) => {
  await prisma.task.delete({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).send({ message: "Task deleted" });
});
