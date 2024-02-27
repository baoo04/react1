import "./App.css";
import React, { useState } from "react";
import SidebarFunction from "./components/sidebar/sidebarFunction";
import Table from "./components/mainContent/Table";

function App() {
    const [showSubFunctions, setShowSubFunctions] = useState(false);

    const toggleSubFunctions = () => {
        setShowSubFunctions(!showSubFunctions);
    };
    return (
        <div className="App">
            <header className="App-header">
                <h1>
                    Admin<span>LTE</span>
                </h1>
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
                        <img src="./public/avatar.jpg" />
                        <span>Alexander Pierce</span>
                    </div>
                    <i class="fa-solid fa-gears"></i>
                </div>
            </header>

            <main>
                <div className="sidebar">
                    <div className="group">
                        <div className="group_user">
                            <img src="../public/avatar.jpg" />
                            <div>
                                <span>Alexander Pierce</span>
                                <span className="status">Online</span>
                            </div>
                        </div>
                        <div className="inputPlace">
                            <input
                                type="text"
                                className="finding"
                                placeHolder="Search..."
                            />
                            <i class="fa fa-search search-icon"></i>
                        </div>
                        <div className="navigation">
                            <h4 className="navigation__title">
                                MAIN NAVIGATION
                            </h4>
                        </div>
                        <SidebarFunction />
                    </div>
                </div>
                <Table/>
            </main>
        </div>
    );
}

export default App;
