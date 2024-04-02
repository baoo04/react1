import React from "react";
import "./SidebarSmall.scss";
export default function SidebarSmall() {
  const items = [
    {
      name: "Dashboard",
      logo: "fa-gauge",
      child: ["Dashboard v1", "Dashboard v2"],
    },
    {
      name: "Layout Options",
      logo: "fa-file",
      isPrimary: 4,
      child: ["Top Navigation", "Boxed", "Fixed", "Collapsed Sidebar"],
    },
    {
      name: "Widgets",
      logo: "fa-table-cells",
      isSuccess: 1,
      child: [],
    },
    {
      name: "Charts",
      logo: "fa-chart-pie",
      child: ["ChartJS", "Morris", "Flot", "Inline charts"],
    },
    {
      name: "UI Elements",
      logo: "fa-laptop",
      child: ["General", "Icons", "Buttons", "Sliders", "Timeline", "Modals"],
    },
    {
      name: "Form",
      logo: "fa-pen-to-square",
      child: ["General Elements", "Advanced Elements", "Editors"],
    },
    {
      name: "Tables",
      logo: "fa-table",
      child: ["Simple Tables", "Data Tables"],
    },
    {
      name: "Calendar",
      logo: "fa-calendar-days",
      isPrimary: 17,
      isDanger: 3,
      child: [],
    },
    {
      name: "Mailbox",
      logo: "fa-envelope",
      isSuccess: 16,
      isDanger: 5,
      isWarning: 12,
      child: [],
    },
    {
      name: "Examples",
      logo: "fa-folder",
      child: [
        "Invoice",
        "Profile",
        "Login",
        "Register",
        "LockScreen",
        "404 Error",
        "500 Error",
        "Black Page",
        "Pace Page",
      ],
    },
    {
      name: "Multilevel",
      logo: "fa-share",
      child: ["Level One", "Level Two", "Level Three"],
    },
    {
      name: "Documentation",
      logo: "fa-book",
      child: [],
    },
  ];
  return (
    <>
      <div className="sidebarSmall">
        <h2 className="sidebarSmall__title">ALT</h2>
        <div className="sidebarSmall__logo">
          <img src="https://i1.sndcdn.com/avatars-000293458829-rcow90-t500x500.jpg" />
        </div>
        <div className="sidebarSmall__list">
          {items.map((item, index) => {
            return <i key={index} className={`fa ${item.logo}`}></i>;
          })}
        </div>
      </div>
      ;
    </>
  );
}
