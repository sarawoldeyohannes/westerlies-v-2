import "./Header.css";
import logo from "../../assets/westerliesLogo.png";
import LocationSearchInput from "../LocationSearchInput/LocationSearchInput";
import { HeaderProps } from "./controller.header";

export const Head = ({ headerClassName, type }: HeaderProps): JSX.Element => {
  return (
    <div className="head">
      <div className={`header ${headerClassName}`}>
        <div className="header-nav-bar">
          <div className="header-nav-bar-texts">
            <div className="text-wrapper">
              <a href="/search">SEARCH</a>
            </div>
          </div>
          <div className="header-nav-bar-texts">
            <div className="text-wrapper">
              <a href="/about">ABOUT</a>
            </div>
          </div>
          <div className="header-nav-bar-texts">
            <div className="text-wrapper">
              <a href="/">HOME</a>
            </div>
          </div>
        </div>
        <div className="logo">
          <a href="/">
            <img className="westerlieslogo" alt="Westerlieslogo" src={logo} />
          </a>
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
