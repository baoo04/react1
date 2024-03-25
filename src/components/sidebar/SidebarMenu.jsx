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

function SidebarMenu() {
    const [expandedItem, setExpandedItem] = useState(null);
    const [childExpanded, setChildExpanded] = useState({});

    const toggleExpand = (index) => {
        if (expandedItem === index) {
            setExpandedItem(null);
            setChildExpanded({});
        } else {
            setExpandedItem(index);
            setChildExpanded({ ...childExpanded, [index]: true });
        }
    };

    return (
        <ul className="sidebar__menu">
            {components.map((component, index) => (
                <li
                    key={index}
                    onClick={() => toggleExpand(index)}
                    className={childExpanded[index] ? "" : ""}
                >
                    <div className="list" style={{display: "flex", justifyContent:"space-between", paddingBottom: 5}}>
                        <div className="groupp">
                            <i className={`fas ${component.logo}`}></i>
                            {component.name}
                        </div>
                        <span
                            className={
                                childExpanded[index] ? "" : "arrow-right"
                            }
                        >
                            {childExpanded[index] || expandedItem === index
                                ? "<"
                                : ">"}
                        </span>
                    </div>
                    {component.child.length > 0 && expandedItem === index && (
                        <ul
                            className={`sideBarChild ${
                                childExpanded[index] ? "" : "none"
                            }`}
                        >
                            {component.child.map((child, childIndex) => (
                                <li
                                    key={childIndex}
                                >
                                    <i className="fa fa-circle-o"></i>
                                    {child}
                                </li>
                            ))}
                        </ul>
                    )}
                </li>
            ))}
        </ul>
    );
}

export default SidebarMenu;
