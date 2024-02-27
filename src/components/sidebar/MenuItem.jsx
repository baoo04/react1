import React, { useState } from "react";
import "./sidebarFunction.css";

export default function MenuItem({ component, index }) {
    const [showChild, setShowChild] = useState(false);
    function toggleShowChild() {
        setShowChild(!showChild);
    }
    return (
        <div>
            <li
                key={index}
                className={`component ${showChild ? `d-flex` : ""}`}
                onClick={(e) => {
                    e.stopPropagation();
                    toggleShowChild();
                }}
            >
                <i className={`fa-solid  ${component.logo}`}>
                    <span>{component.name}</span>
                </i>

                {showChild && (
                    <ul className={"sideBarChild"}>
                        {component.child.map((child, idx) => (
                            <li key={idx}>
                                <i className="fa-regular fa-circle"></i>
                                {child}
                            </li>
                        ))}
                    </ul>
                )}
                <div className="notifications">
                    {!component.isPrimary &&
                        !component.isSuccess &&
                        !component.isWarning &&
                        !component.isDanger && (
                            <i
                                className={`fa-solid fa-chevron-left chevron-left${index}`}
                            ></i>
                        )}
                    {component.isPrimary && (
                        <span className="primary">
                            {component.isPrimary === 1
                                ? "new"
                                : component.isPrimary}
                        </span>
                    )}
                    {component.isSuccess && (
                        <span className="success">
                            {component.isSuccess === 1
                                ? "new"
                                : component.isSuccess}
                        </span>
                    )}
                    {component.isWarning && (
                        <span className="warning">
                            {component.isWarning === 1
                                ? "new"
                                : component.isWarning}
                        </span>
                    )}
                    {component.isDanger && (
                        <span className="danger">
                            {component.isDanger === 1
                                ? "new"
                                : component.isDanger}
                        </span>
                    )}
                </div>
            </li>
        </div>
    );
}
