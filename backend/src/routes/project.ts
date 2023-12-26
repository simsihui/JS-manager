import { Router } from 'express';

import {
    createProject, deleteProject, getProject, getProjects, updateProject
} from '../controllers/project';

const router: Router = Router();

router.route("/:id").get(getProject).put(updateProject).delete(deleteProject);
router.route("/").get(getProjects).post(createProject);

export default router;
