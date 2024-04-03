import React, { useState } from "react";

import "./SidebarMenu.scss";

import { useSelector } from "react-redux";

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
    logo: "fa-fan",
    child: ["ChartJS", "Morris", "Flot", "Inline charts"],
  },
  {
    name: "UI Elements",
    logo: "fa-github",
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

const SidebarMenu = () => {

  const [expandedItem, setExpandedItem] = useState(null);

  const [childExpanded, setChildExpanded] = useState({});

  const isSidebarOpen = useSelector((state) => state.isSidebarOpen);
  
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
      <ul
        className="sidebar__menu"
        style={isSidebarOpen ? { marginTop: "0" } : { marginTop: "15px" }}
      >
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
                <i
                  className={`fas ${component.logo}`}
                  style={
                    isSidebarOpen ? { paddingTop: "0" } : { paddingTop: "7px" }
                  }
                ></i>
                {isSidebarOpen ? component.name : null}
              </div>
              {isSidebarOpen &&
                component.name !== "Layout Options" &&
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
              {isSidebarOpen
                ? component.name === "Layout Options" && (
                    <div
                      className="alert blue-alert"
                      style={{ marginRight: "10px" }}
                    >
                      4
                    </div>
                  )
                : null}

              {isSidebarOpen
                ? component.name === "Widgets" && (
                    <div className="alert green-alert">new</div>
                  )
                : null}
              {isSidebarOpen
                ? component.name === "Calendar" && (
                    <div className="calendar__alerts">
                      <div className="alert green-alert">15</div>
                      <div className="alert red-alert">7</div>
                      <div
                        className="alert blue-alert"
                        style={{ marginRight: "10px" }}
                      >
                        6
                      </div>
                    </div>
                  )
                : null}
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
    </>
  );
};

export default SidebarMenu;
