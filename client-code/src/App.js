import React from "react";
import { Route, Routes } from "react-router-dom";
import Card from "./components/Card.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Card />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
