import "./App.css";
import React, { useState } from "react";
import Table from "./components/mainContent/Table";
import SideBar from "./components/sidebar/SideBar";
import Header from "./components/Header/Header";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <SideBar />
        <main>
          <Header />
          <Table />
        </main>
      </div>
    </Provider>
  );
}

export default App;
