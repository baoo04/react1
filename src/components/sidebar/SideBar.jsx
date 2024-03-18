import React from "react";
import SidebarFunction from "./SidebarMenu";
import "./Sidebar.css";
export default function SideBar() {
    return (
        <div className="sidebar">
            <div className="title">
                <p style={{display: "inline-block"}}>Admin</p>
                <span>LTE</span>
            </div>
            <div className="group">
                <div className="group_user">
                    <img src="https://i1.sndcdn.com/avatars-000293458829-rcow90-t500x500.jpg" />
                    <div>
                        <span>Alexander Pierce</span>
                        <span className="status">Online</span>
                    </div>
                </div>
                <div className="inputPlace">
                    <input
                        type="text"
                        className="finding"
                        placeholder="Search..."
                    />
                    <i className="fa fa-search search-icon"></i>
                </div>
                <div className="navigation">
                    <h4 className="navigation__title">MAIN NAVIGATION</h4>
                </div>
                <SidebarFunction />
            </div>
        </div>
    );
}
