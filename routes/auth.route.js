import  { Router } from "express";
import { getAuth, imageKit } from "../controllers/user.controller.js";

const router = Router()

router.get('/',getAuth)
router.get('/image',imageKit)

export default router