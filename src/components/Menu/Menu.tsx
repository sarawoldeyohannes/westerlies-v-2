import "./Menu.css";
import { menuInfo } from "./prop.menu";
import { AiFillForward } from "react-icons/ai";
import { Link } from "react-router-dom";
const Menu = (isOpenProp: menuInfo) => {
  const toggleMenu = () => {
    isOpenProp.callBack();
  };

  return (
    <div className={`menu ${isOpenProp.isOpen ? "open" : ""}`}>
      <button className="toggle-button" onClick={toggleMenu}>
        <AiFillForward />
      </button>
      <ul className="menu-items">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/search">Search</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
