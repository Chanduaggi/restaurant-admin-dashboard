import express from "express";
import {
  getMenuItems,
  searchMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  toggleAvailability
} from "../controllers/menuController.js";

const router = express.Router();

/**
 * GET /api/menu
 * Filters: category, isAvailable
 */
router.get("/", getMenuItems);

/**
 * GET /api/menu/search?q=keyword
 */
router.get("/search", searchMenuItems);

/**
 * GET /api/menu/:id
 */
router.get("/:id", getMenuItemById);

/**
 * POST /api/menu
 */
router.post("/", createMenuItem);

/**
 * PUT /api/menu/:id
 */
router.put("/:id", updateMenuItem);

/**
 * DELETE /api/menu/:id
 */
router.delete("/:id", deleteMenuItem);

/**
 * PATCH /api/menu/:id/availability
 */
router.patch("/:id/availability", toggleAvailability);

export default router;

