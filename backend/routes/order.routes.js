// backend/routes/order.routes.js (Updated)
import { Router } from "express";
const router = Router();
import { updateOrderLocation, getOrderLocation } from "../controllers/order.controller.js";
import { auth, adminAuth } from "../middleware/auth.middleware.js";

router.patch("/:id/location", auth, adminAuth, updateOrderLocation);
router.get("/:id/location", auth, getOrderLocation);

export default router;
