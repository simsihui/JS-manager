import { Router } from 'express';

import { createTask, deleteTask, getTask, updateTask } from '../controllers/task';

const router: Router = Router();

router.route("/:id").get(getTask).put(updateTask).delete(deleteTask);
router.post("/", createTask);
export default router;
