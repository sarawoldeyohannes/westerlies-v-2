import "./FilterNavbar.css";
import { FiPackage } from "react-icons/fi";
import { BsStars } from "react-icons/bs";
import { IoIosPeople } from "react-icons/io";
const FilterNavbar = () => {
  return (
    <div className="filter-navbar">
      <div className="city-frame">
        <div className="text-wrapper">New York</div>
      </div>
      <div className="nav-list-frame">
        <div className="nav-lists">
          <FiPackage className="icons" />
          <div className="text-wrapper-2">PRODUCT</div>
        </div>
        <div className="nav-lists">
          <IoIosPeople className="icons" />
          <div className="text-wrapper-2">SOCIAL IMPACT</div>
        </div>
        <div className="nav-lists">
          <BsStars className="icons" />
          <div className="text-wrapper-2">OFFER CLASS</div>
        </div>
      </div>
    </div>
  );
};

export default FilterNavbar;
