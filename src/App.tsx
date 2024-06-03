import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Search from "./pages/Search/Search";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
