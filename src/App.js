import "./App.css";
import React, { useState } from "react";
import Table from "./components/mainContent/Table";
import SideBar from "./components/sidebar/SideBar";
import Header from "./components/Header/Header";

function App() {
    const [showSubFunctions, setShowSubFunctions] = useState(false);

    const toggleSubFunctions = () => {
        setShowSubFunctions(!showSubFunctions);
    };
    return (
        <div className="App">
            <SideBar />
            <main>
                <Header />
                <Table />
            </main>
        </div>
    );
}

export default App;
