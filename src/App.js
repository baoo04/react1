import "./App.scss";

import React, { useState } from "react";

import Table from "./components/MainContent/Table";

import SideBar from "./components/Sidebar/SideBar";

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
