import  { Router } from "express";
import { deleteMenuItem, getAllMenu, getMenuItem, postMenu, updateMenuItem } from "../controllers/menu.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router()

router.get('/',getAllMenu)
router.get('/:id',getMenuItem)
router.post('/',authMiddleware,postMenu)
router.patch('/:id',updateMenuItem)
router.delete('/:id',deleteMenuItem)

export default router