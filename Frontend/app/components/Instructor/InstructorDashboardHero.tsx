import React, { useState } from "react";
import DashboardHeader from "../Admin/DashboardHeader";
import InstructorDashboardWidgets from "./Widgets/InstructorDashboardWidgets";

type Props = {
  isDashboard?: boolean;
};

const InstructorDashboardHero = ({isDashboard}: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <DashboardHeader open={open} setOpen={setOpen} />
      {
        isDashboard && (
          <InstructorDashboardWidgets open={open} />
        )
      }
    </div>
  );
};

export default InstructorDashboardHero;
