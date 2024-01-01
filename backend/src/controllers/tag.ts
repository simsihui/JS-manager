import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

import { PrismaClient } from '@prisma/client';

const prisma: PrismaClient = new PrismaClient();

// @desc    Create new tag
// @route   POST tag
// @access  Private
export const createTag = asyncHandler(async (req: Request, res: Response) => {
  if (req?.body?.label?.toLowerCase() === "tags") {
    res.status(409);
    throw new Error("Tag name cannot be 'tags'");
  }

  // Tags should be unique for each project
  const isUnique = await prisma.tag.findFirst({
    where: {
      label: req.body.label.charAt(0).toUpperCase() + req.body.label.slice(1),
      projectId: req.body.projectId,
    },
  });

  if (!isUnique) {
    const tag = await prisma.tag.create({
      data: {
        label: req.body.label.charAt(0).toUpperCase() + req.body.label.slice(1),
        options: req.body.options,
        multiple: req?.body?.multiple || false,
        required: req?.body?.required || false,
        project: {
          connect: {
            id: req.body.projectId,
          },
        },
      },
    });
    res.status(200).send(tag);
  } else {
    res.status(409);
    throw new Error("Tag already exists");
  }
});

// @desc    Update tag
// @route   PUT tag/:id
// @access  Private
export const updateTag = asyncHandler(async (req: Request, res: Response) => {
  if (req?.body?.label?.toLowerCase() === "tags") {
    res.status(409);
    throw new Error("Tag name cannot be 'tags'");
  }

  // Tags should be unique for each project
  const isUnique = await prisma.tag.findFirst({
    where: {
      label: req.body.label.charAt(0).toUpperCase() + req.body.label.slice(1),
      projectId: req.body.projectId,
    },
  });

  if (!isUnique) {
    const tag = await prisma.tag.update({
      where: {
        id: req.body.id, // tag id
      },
      data: {
        label: req.body.label.charAt(0).toUpperCase() + req.body.label.slice(1),
        options: req.body.options,
        multiple: req?.body?.multiple || false,
        required: req?.body?.required || false,
      },
    });
    res.status(200).send(tag);
  } else {
    res.status(409);
    throw new Error("Tag already exists");
  }
});

// @desc    Delete tag
// @route   DELETE tag/:id
// @access  Private
export const deleteTag = asyncHandler(async (req: Request, res: Response) => {
  await prisma.tag.delete({
    where: {
      id: req.body.id, // tag id
    },
  });
  res.status(200).send({ message: "Tag deleted" });
});
