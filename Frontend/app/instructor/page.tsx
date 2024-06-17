"use client";
import React from "react";
import Heading from "../utils/Heading";
import InstructorSidebar from "../components/Instructor/sidebar/InstructorSidebar";
import InstructorDashboardHero from "../components/Instructor/InstructorDashboardHero";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      
        <Heading
          title="Academy IQ - Instructor"
          description="Academy IQ is a platform for students to learn and get help from teachers"
          keywords="Programming,MERN,Redux,Machine Learning"
        />
        <div className="flex min-h-screen">
          <div className="1500px:w-[16%] w-1/5">
            <InstructorSidebar />
          </div>
          <div className="w-[85%]">
            <InstructorDashboardHero isDashboard={true} />
          </div>
        </div>
    </div>
  );
};

export default page;
