import { Router } from "express";
import { login, logout, register, updateImage, updateName } from "../controllers/user.controller.js";

const router = Router()

router.post('/register',register)
router.post('/login',login)
router.post('/logout',logout)
router.patch('/updatename',updateName)
router.patch('/updateimage',updateImage)

export default router