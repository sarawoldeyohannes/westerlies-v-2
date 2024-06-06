import "./Header.css";
import logo from "../../assets/westerliesLogo.png";
import LocationSearchInput from "../LocationSearchInput/LocationSearchInput";
import { HeaderProps } from "./controller.header";
import { Link } from "react-router-dom";

export const Head = ({ headerClassName, type }: HeaderProps): JSX.Element => {
  return (
    <div className="head">
      <div className={`header ${headerClassName}`}>
        <div className="header-nav-bar">
          <div className="header-nav-bar-texts">
            <div className="text-wrapper">
              <Link to="search">SEARCH</Link>
            </div>
          </div>
          <div className="header-nav-bar-texts">
            <div className="text-wrapper">
              <Link to="/about">ABOUT</Link>
            </div>
          </div>
          <div className="header-nav-bar-texts">
            <div className="text-wrapper">
              <Link to="/">HOME</Link>
            </div>
          </div>
        </div>
        <div className="logo">
          <Link to="/">
            <img className="westerlieslogo" alt="Westerlieslogo" src={logo} />
          </Link>
        </div>
      </div>
      <div className={type == "About" ? "search-disabled" : "search"}>
        <div className="div-wrapper">
          <div className="text-wrapper-2">Find a Shop</div>
        </div>
        <div className="div-wrapper">
          <div className="text-wrapper-2">|</div>
        </div>
        <LocationSearchInput />
      </div>
    </div>
  );
};
