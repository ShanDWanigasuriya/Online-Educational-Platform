import express from "express";
import {
  UploadApprovedCourse,
  addAnwser,
  addQuestion,
  addReplyToReview,
  addReview,
  deleteCourse,
  editCourse,
  generateVideoUrl,
  getAdminAllApprovedCourses,
  getAdminAllCourses,
  getAllCourses,
  getCourseByUser,
  getInstructorAllCourses,
  getSingleCourse,
  removeCourse,
  uploadCourse,
} from "../controllers/course.controller";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
const courseRouter = express.Router();

courseRouter.post(
  "/create-course",
  isAutheticated,
  authorizeRoles("instructor"),
  uploadCourse
);

courseRouter.post(
  "/approve-course",
  isAutheticated,
  authorizeRoles("admin"),
  UploadApprovedCourse
);

courseRouter.put(
  "/edit-course/:id",
  isAutheticated,
  authorizeRoles("instructor"),
  editCourse
);

courseRouter.get("/get-course/:id", getSingleCourse);

courseRouter.get("/get-courses", getAllCourses);

courseRouter.get(
  "/get-admin-courses",
  isAutheticated,
  authorizeRoles("instructor", "admin"),
  getAdminAllCourses
);

courseRouter.get(
  "/get-admin-approveCourses",
  isAutheticated,
  authorizeRoles("admin"),
  getAdminAllApprovedCourses
);

courseRouter.get(
  "/get-instructor-courses",
  isAutheticated,
  authorizeRoles("instructor", "admin"),
  getInstructorAllCourses
);

courseRouter.get("/get-course-content/:id", isAutheticated, getCourseByUser);

courseRouter.put("/add-question", isAutheticated, addQuestion);

courseRouter.put("/add-answer", isAutheticated, addAnwser);

courseRouter.put("/add-review/:id", isAutheticated, addReview);

courseRouter.put(
  "/add-reply",
  isAutheticated,
  authorizeRoles("instructor", "admin"),
  addReplyToReview
);

courseRouter.post("/getVdoCipherOTP", generateVideoUrl);

courseRouter.delete(
  "/delete-course/:id",
  isAutheticated,
  authorizeRoles("instructor"),
  deleteCourse
);

courseRouter.delete(
  "/remove-course/:id",
  isAutheticated,
  authorizeRoles("admin"),
  removeCourse
);

export default courseRouter;
