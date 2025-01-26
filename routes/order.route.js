import { Router } from "express";
import { getAllOrders, getOrder, orderCheckout, updateOrderStatus } from "../controllers/order.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router()

router.post('/',orderCheckout)
router.get('/',getOrder)
router.get('/orderadmin',authMiddleware,getAllOrders)
router.put('/orderadmin/:id',authMiddleware,updateOrderStatus)
export default router