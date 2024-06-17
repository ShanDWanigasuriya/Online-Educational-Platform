import React, { FC, useEffect, useState } from "react";
import { BiBorderLeft } from "react-icons/bi";
import { SiCoursera } from "react-icons/si";
import { Box, CircularProgress } from "@mui/material";
import {
  useGetCoursesAnalyticsQuery,
  useGetCreatedCoursesAnalyticsQuery,
  useGetOrdersAnalyticsQuery,
  useGetUsersAnalyticsQuery,
} from "@/redux/features/analytics/analyticsApi";
import UserEnrollmentAnalytics from "../../Instructor/userEnrollements/UserEnrollmentAnalytics";
import CourseAnalytics from "../../Admin/Analytics/CourseAnalytics";

type Props = {
  open?: boolean;
  value?: number;
};

const CircularProgressWithLabel: FC<Props> = ({ open, value }) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={value}
        size={45}
        color={value && value > 99 ? "info" : "error"}
        thickness={4}
        style={{ zIndex: open ? -1 : 1 }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></Box>
    </Box>
  );
};

const InstructorDashboardWidgets: FC<Props> = ({ open }) => {
  const [ordersComparePercentage, setOrdersComparePercentage] = useState<any>();
  const [userComparePercentage, setuserComparePercentage] = useState<any>();
  const [courseComparePercentage, setCourseComparePercentage] = useState<any>();
  const [CreatedCourseomparePercentage, setCreatedCourseComparePercentage] =
    useState<any>();

  const { data: userData, isLoading: userLoading } = useGetUsersAnalyticsQuery(
    {}
  );
  const { data: ordersData, isLoading: ordersLoading } =
    useGetOrdersAnalyticsQuery({});
  const { data: courseData, isLoading: coursesLoading } =
    useGetCoursesAnalyticsQuery({});
  const { data: createdcourseData, isLoading: createdcoursesLoading } =
    useGetCreatedCoursesAnalyticsQuery({});
  console.log(courseData);
  console.log(createdcourseData);
  console.log(ordersData);
  console.log(userData);

  useEffect(() => {
    if (
      userLoading &&
      ordersLoading &&
      coursesLoading &&
      createdcoursesLoading
    ) {
      return;
    } else {
      if (userData && ordersData && courseData && createdcourseData) {
        const usersLastTwoMonths = userData.users.last12Months.slice(-2);
        const ordersLastTwoMonths = ordersData.orders.last12Months.slice(-2);
        const courseLastTwoMonths = courseData.courses.last12Months.slice(-2);
        const createdCourseLastTwoMonths =
          createdcourseData.courses.last12Months.slice(-2);

        if (
          usersLastTwoMonths.length === 2 &&
          ordersLastTwoMonths.length === 2 &&
          courseLastTwoMonths.length === 2 &&
          createdCourseLastTwoMonths.length === 2
        ) {
          const usersCurrentMonth = usersLastTwoMonths[1].count;
          const usersPreviousMonth = usersLastTwoMonths[0].count;
          const ordersCurrentMonth = ordersLastTwoMonths[1].count;
          const ordersPreviousMonth = ordersLastTwoMonths[0].count;
          const coursesCurrentMonth = courseLastTwoMonths[1].count;
          const coursesPreviousMonth = courseLastTwoMonths[0].count;
          const createdCoursesCurrentMonth =
            createdCourseLastTwoMonths[1].count;
          const createdCoursesPreviousMonth =
            createdCourseLastTwoMonths[0].count;

          const usersPercentChange =
            usersPreviousMonth !== 0
              ? ((usersCurrentMonth - usersPreviousMonth) /
                  usersPreviousMonth) *
                100
              : 100;

          const ordersPercentChange =
            ordersPreviousMonth !== 0
              ? ((ordersCurrentMonth - ordersPreviousMonth) /
                  ordersPreviousMonth) *
                100
              : 100;

          const coursesPercentChange =
            coursesPreviousMonth !== 0
              ? ((coursesCurrentMonth - coursesPreviousMonth) /
                  coursesPreviousMonth) *
                100
              : 100;

          const createdcoursesPercentChange =
            createdCoursesPreviousMonth !== 0
              ? ((createdCoursesCurrentMonth - createdCoursesPreviousMonth) /
                  createdCoursesPreviousMonth) *
                100
              : 100;

          setuserComparePercentage({
            currentMonth: usersCurrentMonth,
            previousMonth: usersPreviousMonth,
            percentChange: usersPercentChange,
          });

          setOrdersComparePercentage({
            currentMonth: ordersCurrentMonth,
            previousMonth: ordersPreviousMonth,
            percentChange: ordersPercentChange,
          });

          setCourseComparePercentage({
            currentMonth: coursesCurrentMonth,
            previousMonth: coursesPreviousMonth,
            percentChange: coursesPercentChange,
          });

          setCreatedCourseComparePercentage({
            currentMonth: createdCoursesCurrentMonth,
            previousMonth: createdCoursesPreviousMonth,
            percentChange: createdcoursesPercentChange,
          });
        }
      }
    }
  }, [
    userLoading,
    ordersLoading,
    userData,
    ordersData,
    createdcoursesLoading,
    coursesLoading,
    courseData,
    createdcourseData,
  ]);

  return (
    <div className="mt-[30px] min-h-screen">
      <div className="grid grid-cols-[60%,40%]">
        <div className="p-8 ">< br/>< br/>
        <UserEnrollmentAnalytics isDashboard={true} />< br/>< br/>
        <CourseAnalytics isDashboard={true} />
        </div>
        <div className="pt-[80px] pr-8">< br/>< br/>
          <div className="w-full dark:bg-[#111C43] rounded-sm shadow">
            <div className="flex items-center p-5 justify-between">
              <div className="">
                <BiBorderLeft className="dark:text-[#45CBA0] text-[#000] text-[30px]" />
                <h5 className="pt-2 font-Poppins dark:text-[#fff] text-black text-[20px]">
                  {ordersComparePercentage?.currentMonth}
                </h5>
                <h5 className="py-2 font-Poppins dark:text-[#45CBA0] text-black text-[20px] font-[400]">
                  Enrollements
                </h5>
              </div>
              <div>
                <CircularProgressWithLabel
                  value={ordersComparePercentage?.percentChange > 0 ? 100 : 0}
                  open={open}
                />
                <h5 className="text-center pt-4">
                  {ordersComparePercentage?.percentChange > 0
                    ? "+" + ordersComparePercentage?.percentChange.toFixed(2)
                    : "-" +
                      ordersComparePercentage?.percentChange.toFixed(2)}{" "}
                  %
                </h5>
              </div>
            </div>
          </div>

          <div className="w-full dark:bg-[#111C43] rounded-sm shadow my-8">
            <div className="flex items-center p-5 justify-between">
              <div className="">
                <SiCoursera  className="dark:text-[#45CBA0] text-[#000] text-[30px]" />
                <h5 className="pt-2 font-Poppins dark:text-[#fff] text-black text-[20px]">
                  {CreatedCourseomparePercentage?.currentMonth}
                </h5>
                <h5 className="py-2 font-Poppins dark:text-[#45CBA0] text-black text-[20px] font-[400]">
                  Created Courses
                </h5>
              </div>
              <div>
                <CircularProgressWithLabel
                  value={
                    CreatedCourseomparePercentage?.percentChange > 0 ? 100 : 0
                  }
                  open={open}
                />
                <h5 className="text-center pt-4">
                  {CreatedCourseomparePercentage?.percentChange > 0
                    ? "+" +
                      CreatedCourseomparePercentage?.percentChange.toFixed(2)
                    : "-" +
                      CreatedCourseomparePercentage?.percentChange.toFixed(
                        2
                      )}{" "}
                  %
                </h5>
              </div>
            </div>
          </div>

          <div className="w-full dark:bg-[#111C43] rounded-sm shadow my-8">
            <div className="flex items-center p-5 justify-between">
              <div className="">
                <SiCoursera  className="dark:text-[#45CBA0] text-[#000] text-[30px]" />
                <h5 className="pt-2 font-Poppins dark:text-[#fff] text-black text-[20px]">
                  {courseComparePercentage?.currentMonth}
                </h5>
                <h5 className="py-2 font-Poppins dark:text-[#45CBA0] text-black text-[20px] font-[400]">
                  Live Courses
                </h5>
              </div>
              <div>
                <CircularProgressWithLabel
                  value={courseComparePercentage?.percentChange > 0 ? 100 : 0}
                  open={open}
                />
                <h5 className="text-center pt-4">
                  {courseComparePercentage?.percentChange > 0
                    ? "+" + courseComparePercentage?.percentChange.toFixed(2)
                    : "-" +
                      courseComparePercentage?.percentChange.toFixed(2)}{" "}
                  %
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboardWidgets;
