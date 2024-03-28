import React from "react";
import "./Header.css";
import { toggleSideBar } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

export default function Header() {
  const sidebarOpen = useSelector((state) => state.sidebarOpen);
  const dispatch = useDispatch();
  const handleSidebarOpen = () => {
    dispatch(toggleSideBar(!sidebarOpen));
    console.log(sidebarOpen);
  };
  return (
    <>
      <div className="title-responsive">
        <span>Admin</span>
        LTE
      </div>
      <header className="App-header">
        <i
          className="fa-solid fa-bars"
          onClick={() => {
            handleSidebarOpen();
          }}
          style={{
            cursor: "pointer",
          }}
        ></i>
        <div className="App-header__group">
          <div className="letter">
            <i className="fa-regular fa-envelope"></i>
            <div className="badge let">4</div>
          </div>
          <div className="notification">
            <i className="fa-regular fa-bell"></i>
            <div className="badge noti">10</div>
          </div>
          <div className="Flag">
            <i className="fa-regular fa-flag"></i>
            <div className="badge flag">9</div>
          </div>
          <div className="avatar">
            <img src="https://i1.sndcdn.com/avatars-000293458829-rcow90-t500x500.jpg" />
            <span>Alexander Pierce</span>
          </div>
          <i className="fa-solid fa-gears"></i>
        </div>
      </header>
    </>
  );
}
