import express from "express";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
import {
  createOrder
} from "../controllers/payment.controller";
const paymentRouter = express.Router();

paymentRouter.post("/create-order", isAutheticated, createOrder);

export default paymentRouter;
