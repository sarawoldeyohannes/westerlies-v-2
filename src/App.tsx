import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Search from "./pages/Search/Search";
import AdminHome from "./pages/Admin/Main/AdminHome/AdminHome";
import Login from "./pages/Admin/Login/Login";
import "./App.css";
import ShopProfile from "./pages/ShopProfile/ShopProfile";
import Emails from "./pages/Admin/Main/Emails/Emails";
import Add from "./pages/Admin/Main/Add/Add";
import "bootstrap/dist/css/bootstrap.min.css";
import Update from "./pages/Admin/Main/Update/Update";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="search" element={<Search />} />
          <Route path="search/:cityId" element={<Search />} />
          <Route path="shopProfile" element={<ShopProfile />} />
          <Route path="shopProfile/:storeId" element={<ShopProfile />} />
          <Route path="shopProfile/:storeId/:cityName" element={<ShopProfile />} />
          <Route path="login" element={<Login />} />
          <Route path="AdminHome" element={<AdminHome />} />
          <Route path="update/:id" element={<Update />} />
          <Route path="emails" element={<Emails />} />
          <Route path="Add" element={<Add />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
