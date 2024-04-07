import React from "react";

import SidebarMenu from "./SidebarMenu";

import "./Sidebar.scss";

import { useSelector } from "react-redux";

export default function SideBar() {
  
  const isSidebarOpen = useSelector((state) => state.modalReducers.isSidebarOpen);
  
  return (
    <>
      <div className={`sidebar ${isSidebarOpen ? "" : "minimized"}`}>
        {isSidebarOpen ? (
          <div className="title">
            <p style={{ display: "inline-block" }}>Admin</p>
            <span>LTE</span>
          </div>
        ) : (
          <div className="title__minimized">
            <span>ALT</span>
          </div>
        )}
        <div className="group">
          <div className="group_user">
            <img src="https://i1.sndcdn.com/avatars-000293458829-rcow90-t500x500.jpg" />
            <div className="user__info">
              <span>Alexander Pierce</span>
              <span className="status">Online</span>
            </div>
          </div>
          <div className="inputPlace">
            <input type="text" className="finding" placeholder="Search..." />
            <i className="fa fa-search search-icon"></i>
          </div>
          <div className="navigation">
            <h4 className="navigation__title">MAIN NAVIGATION</h4>
          </div>
          <SidebarMenu />
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
        </div>
      </div>
    </>
  );
}
