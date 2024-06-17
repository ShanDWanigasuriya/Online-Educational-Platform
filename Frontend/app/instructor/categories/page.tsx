"use client";
import DashboardHero from "@/app/components/Admin/DashboardHero";
import AdminProtected from "@/app/hooks/adminProtected";
import Heading from "@/app/utils/Heading";
import React from "react";
import EditCategories from "../../components/Instructor/Customization/EditCategories";
import InstructorSidebar from "@/app/components/Instructor/sidebar/InstructorSidebar";
import InstructorDashboardHero from "@/app/components/Instructor/InstructorDashboardHero";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
        <Heading
          title="Academy IQ - Instructor"
          description="Academy IQ is a platform for students to learn and get help from teachers"
          keywords="Programming,MERN,Redux,Machine Learning"
        />
        <div className="flex h-screen">
          <div className="1500px:w-[16%] w-1/5">
            <InstructorSidebar />
          </div>
          <div className="w-[85%]">
            <InstructorDashboardHero />
            <EditCategories />
          </div>
        </div>
    </div>
  );
};

export default page;
