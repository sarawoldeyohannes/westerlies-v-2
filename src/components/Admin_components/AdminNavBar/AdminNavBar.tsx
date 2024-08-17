import { Link } from "react-router-dom";
import { LuMailCheck } from "react-icons/lu";
import { LiaStoreSolid } from "react-icons/lia";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { PiArticleNyTimes } from "react-icons/pi";
import { ImBlog } from "react-icons/im";
import img from "../../../assets/westerliesLogoblue.png";
import "./AdminNavBar.css";
const AdminNavBar = () => {
  return (
    <div className="navcontainer">
      <div className="logo">
        <Link to="/" target="_blank">
          <img src={img}></img>
        </Link>
      </div>
      <nav className="nav">
        <div className="nav-upper-options">
          <div className="nav-option option1">
            <ImBlog />

            <Link to="/AdminHome"> Blog</Link>
          </div>

          <div className="nav-option option2 nav-option">
            <PiArticleNyTimes />

            <a href="articles.html">
              <Link to="/AdminHome">Articles</Link>
            </a>
          </div>

          <div className="nav-option option3">
            <HiOutlineDocumentReport />

            <Link to="/AdminHome"> Report</Link>
          </div>

          <div className="nav-option option4">
            <LiaStoreSolid />

            <Link to="/AdminHome"> Stores</Link>
          </div>

          <div className="nav-option option5">
            <LuMailCheck />

            <Link to="/emails">Emails</Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default AdminNavBar;
