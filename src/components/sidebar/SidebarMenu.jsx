import React, { useState } from "react";
import "./SidebarMenu.scss";

const components = [
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
      "Lockscreen",
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

const log = (data) => {
  console.log(data);
};

const SidebarMenu = () => {
  const [expandedItem, setExpandedItem] = useState(null);
  const [childExpanded, setChildExpanded] = useState({});

  const toggleExpand = (index) => {
    if (expandedItem === index) {
      setExpandedItem(null);
      setChildExpanded({});
    } else {
      setExpandedItem(index);
      const newChildExpanded = {};
      for (let i = 0; i < components.length; i++) {
        if (i !== index) {
          newChildExpanded[i] = false;
        } else {
          newChildExpanded[i] = true;
        }
      }
      setChildExpanded(newChildExpanded);
    }
  };

  return (
    <>
      <ul className="sidebar__menu">
        {components.map((component, index) => (
          <li
            key={index}
            onClick={() => toggleExpand(index)}
            className={childExpanded[index] ? "expanded" : ""}
          >
            <div
              className="list"
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingBottom: 5,
              }}
            >
              <div className="groupp">
                <i className={`fas ${component.logo}`}></i>
                {component.name}
              </div>
              {component.name !== "Layout Options" &&
                component.name !== "Widgets" &&
                component.name !== "Calendar" && (
                  <i
                    className={
                      childExpanded[index]
                        ? "fa fa-angle-down arrow-down"
                        : "fa fa-angle-left arrow-left"
                    }
                  ></i>
                )}
              {component.name === "Layout Options" && (
                <div
                  className="alert blue-alert"
                  style={{ marginRight: "10px" }}
                >
                  4
                </div>
              )}
              {component.name === "Widgets" && (
                <div className="alert green-alert">new</div>
              )}
              {component.name === "Calendar" && (
                <div className="calendar__alerts">
                  <div className="alert blue-alert">17</div>
                  <div className="alert red-alert">3</div>
                </div>
              )}
            </div>
            {component.child.length > 0 && expandedItem === index && (
              <ul
                className={`sideBarChild ${
                  childExpanded[index] ? "expanded" : ""
                }`}
              >
                {component.child.map((child, childIndex) => (
                  <li key={childIndex}>
                    <i className="fa fa-circle-o"></i>
                    {child}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      <div className="labels">
        <h3>LABELS</h3>
        <div className="labels__list">
          <div className="labels__list--item">
            <i className="fa fa-circle-o text-red"></i>
            <span>Important</span>
          </div>
          <div className="labels__list--item">
            <i className="fa fa-circle-o text-yellow"></i>
            <span>Warning</span>
          </div>
          <div className="labels__list--item">
            <i className="fa fa-circle-o text-blue"></i>
            <span>Information</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarMenu;
