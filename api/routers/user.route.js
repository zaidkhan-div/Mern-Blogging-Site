import express from 'express';
import { signout, test } from '../controllers/user.contollers.js';
import { updateUser } from '../controllers/user.contollers.js';
import { deleteUser } from '../controllers/user.contollers.js';
import { verifyToken } from '../utils/verifyUser.js';
const router = express.Router();

router.get('/test', test)
router.put('/update/:userId', verifyToken, updateUser)
router.delete('/delete/:userId', verifyToken, deleteUser)
router.post('/signout', signout)

export default router;