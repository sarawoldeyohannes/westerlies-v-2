import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Search from "./pages/Search/Search";
import "./App.css";
import ShopProfile from "./pages/ShopProfile/ShopProfile";

function App() {
  return (
    <>
      <Router basename="/westerlies-v-2">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="search" element={<Search />} />
          <Route path="shopProfile" element={<ShopProfile />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
