import React from "react";
import "./Header.css";
export default function Header() {
    return (
        <>
            <div className="title-responsive">
                <span>Admin</span>
                LTE
            </div>
            <header className="App-header">
                <i class="fa-solid fa-bars"></i>
                <div className="App-header__group">
                    <div className="letter">
                        <i class="fa-regular fa-envelope"></i>
                        <div className="badge let">4</div>
                    </div>
                    <div className="notification">
                        <i class="fa-regular fa-bell"></i>
                        <div className="badge noti">10</div>
                    </div>
                    <div className="Flag">
                        <i class="fa-regular fa-flag"></i>
                        <div className="badge flag">9</div>
                    </div>
                    <div className="avatar">
                        <img src="https://i1.sndcdn.com/avatars-000293458829-rcow90-t500x500.jpg" />
                        <span>Alexander Pierce</span>
                    </div>
                    <i class="fa-solid fa-gears"></i>
                </div>
            </header>
        </>
    );
}
