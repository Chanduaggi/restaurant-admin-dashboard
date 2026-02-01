import express from "express";
import {
  getOrders,
  getOrderById,
  createOrder,
  updateOrderStatus
} from "../controllers/orderController.js";

const router = express.Router();

/**
 * GET /api/orders
 * Supports pagination & status filter
 */
router.get("/", getOrders);

/**
 * GET /api/orders/:id
 */
router.get("/:id", getOrderById);

/**
 * POST /api/orders
 */
router.post("/", createOrder);

/**
 * PATCH /api/orders/:id/status
 */
router.patch("/:id/status", updateOrderStatus);

export default router;
