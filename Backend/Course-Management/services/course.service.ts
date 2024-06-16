import { Response } from "express";
import CourseModel from "../models/course.model";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ApprovedCourseModel from "../models/approveCourse.model";

// create course
export const createCourse = CatchAsyncError(async(data:any,res:Response)=>{
    const course = await CourseModel.create(data);
    res.status(201).json({
        success:true,
        course
    });
})

// approve course
export const approveCourse = CatchAsyncError(async(data:any,res:Response)=>{
  const course = await ApprovedCourseModel.create(data);
  res.status(201).json({
      success:true,
      course
  });
})

// Get All Created ourses
export const getAllCreatedCoursesService = async (res: Response) => {
    const courses = await CourseModel.find().sort({ createdAt: -1 });
  
    res.status(201).json({
      success: true,
      courses,
    });
  };

  // Get All Approved Courses
export const getAllApprovedCoursesService = async (res: Response) => {
  const courses = await ApprovedCourseModel.find().sort({ createdAt: -1 });

  res.status(201).json({
    success: true,
    courses,
  });
};

// Get All Created ourses
export const getAllAdminCoursesService = async (res: Response) => {
  const courses = await ApprovedCourseModel.find().sort({ createdAt: -1 });

  res.status(201).json({
    success: true,
    courses,
  });
};