import { Router } from 'express';

import { authUser, getUser, logoutUser, registerUser, updateUser } from '../controllers/user';
import protect from '../middleware/auth';

const router: Router = Router();

router.post("/auth", authUser);
router.post("/register", registerUser);
router.post("/logout", logoutUser);
router.route("/").get(protect, getUser).put(protect, updateUser);

export default router;
