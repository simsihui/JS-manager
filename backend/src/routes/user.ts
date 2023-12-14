import { Request, Response, Router } from 'express';

import { PrismaClient } from '@prisma/client';

const router: Router = Router();
const prisma: PrismaClient = new PrismaClient();

router.post("/", async (req: Request, res: Response) => {
  const { name, email } = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
      },
    });
    res.send(user);
  } catch (error) {
    res.status(409).send({ error: "User already exists" });
  }
});

export default router;
