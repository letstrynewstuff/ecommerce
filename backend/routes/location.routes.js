

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

// =======================
// ADMIN ROUTES (PROTECTED)
// =======================
router.get("/", auth, adminAuth, getLocations);
router.post("/", auth, adminAuth, createLocation);
router.put("/:trackingCode", auth, adminAuth, updateLocation);
router.delete("/:trackingCode", auth, adminAuth, deleteLocation);

// =======================
// PUBLIC TRACKING ROUTE
// =======================
// ✅ THIS IS THE REAL PATH
// https://yourdomain/api/locations/tracking/TRK-XXXX
router.get("/tracking/:trackingCode", trackLocation);

export default router;
