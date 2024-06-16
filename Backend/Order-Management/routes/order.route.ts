import express from "express";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
import {
  getAllOrders
} from "../controllers/order.controller";
const orderRouter = express.Router();

orderRouter.get(
  "/get-orders",
  isAutheticated,
  authorizeRoles("admin"),
  getAllOrders
);

export default orderRouter;
