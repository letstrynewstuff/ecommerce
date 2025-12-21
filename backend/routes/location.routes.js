import { Router } from "express";
import {
  getLocations,
  trackLocation,
  createLocation,
  updateLocation,
  deleteLocation,
} from "../controllers/location.controller.js";
import { auth, adminAuth } from "../middleware/auth.middleware.js";

const router = Router();

// Admin routes
router.get("/", auth, adminAuth, getLocations);
router.post("/", auth, adminAuth, createLocation);
router.put("/:trackingCode", auth, adminAuth, updateLocation);
router.delete("/:trackingCode", auth, adminAuth, deleteLocation);

// Public route for users
router.get("/track/:trackingCode", trackLocation);

export default router;
