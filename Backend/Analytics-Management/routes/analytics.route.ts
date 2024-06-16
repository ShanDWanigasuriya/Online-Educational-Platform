import express from "express";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
import { welcome, getCoursesAnalytics, getCreatedCoursesAnalytics, getOrderAnalytics, getUsersAnalytics } from "../controllers/analytics.controller";
const analyticsRouter = express.Router();

analyticsRouter.get("/", welcome);

analyticsRouter.get("/get-users-analytics", isAutheticated,authorizeRoles("instructor", "admin"), getUsersAnalytics);

analyticsRouter.get("/get-orders-analytics", isAutheticated,authorizeRoles("instructor", "admin"), getOrderAnalytics);

analyticsRouter.get("/get-courses-analytics", isAutheticated,authorizeRoles("instructor", "admin"), getCoursesAnalytics);

analyticsRouter.get("/get-createdCourses-analytics", isAutheticated,authorizeRoles("instructor", "admin"), getCreatedCoursesAnalytics);


export default analyticsRouter;