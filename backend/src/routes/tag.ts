import { Router } from 'express';

import { createTag, deleteTag, updateTag } from '../controllers/tag';

const router: Router = Router();

router.route("/:id").put(updateTag).delete(deleteTag);
router.post("/", createTag);

export default router;
