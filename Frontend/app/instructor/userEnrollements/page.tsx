'use client'
import React from 'react'
import Heading from '../../../app/utils/Heading';
import UserEnrollmentAnalytics from "../../components/Instructor/userEnrollements/UserEnrollmentAnalytics";
import DashboardHeader from '../../../app/components/Admin/DashboardHeader';
import InstructorSidebar from '@/app/components/Instructor/sidebar/InstructorSidebar';

type Props = {}

const page = (props: Props) => {
  return (
    <div>
        <Heading
         title="Academy IQ - Instructor"
         description="Academy IQ is a platform for students to learn and get help from teachers"
         keywords="Prograaming,MERN,Redux,Machine Learning"
        />
        <div className="flex">
            <div className="1500px:w-[16%] w-1/5">
                <InstructorSidebar />
            </div>
            <div className="w-[85%]">
               <DashboardHeader />
               <UserEnrollmentAnalytics />
            </div>
        </div>
    </div>
  )
}

export default page