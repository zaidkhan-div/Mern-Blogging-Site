import express from "express";
import { signup } from "../controllers/auth.contollers.js";
import { signin } from "../controllers/auth.contollers.js";

const router = express.Router();

router.post('/signup', signup)
router.post('/signin', signin)

export default router;