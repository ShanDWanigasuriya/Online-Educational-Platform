import { Response } from "express";
import OrderModel from "../models/order.Model";

// Get All Orders
export const getAllOrdersService = async (res: Response) => {
    const orders = await OrderModel.find().sort({ createdAt: -1 });
  
    res.status(201).json({
      success: true,
      orders,
    });
  };
  