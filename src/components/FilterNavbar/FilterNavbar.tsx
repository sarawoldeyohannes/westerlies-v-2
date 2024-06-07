import "./FilterNavbar.css";
import "./mobile.filterNavbar.css";
import { FiPackage } from "react-icons/fi";
import { BsStars } from "react-icons/bs";
import { IoIosPeople } from "react-icons/io";
import { useState } from "react";
import FilterPopUp from "../FilterPopUp/FilterPopUp";
const FilterNavbar = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [filterType, setFilterType] = useState("");

  const handleOpenPopup = (type: string) => {
    setShowPopup(true);
    setFilterType(type);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  return (
    <div className="filter-navbar">
      <div className="city-frame">
        <div className="text-wrapper">New York</div>
      </div>
      <div className="nav-list-frame">
        <div className="nav-lists" onClick={() => handleOpenPopup("PRODUCT")}>
          <FiPackage className="icons" />
          <div className="text-wrapper-2">PRODUCT</div>
        </div>
        <div
          className="nav-lists"
          onClick={() => handleOpenPopup("SOCIAL IMPACT")}
        >
          <IoIosPeople className="icons" />
          <div className="text-wrapper-2">SOCIAL IMPACT</div>
        </div>
        <div
          className="nav-lists"
          onClick={() => handleOpenPopup("OFFER CLASS")}
        >
          <BsStars className="icons" />
          <div className="text-wrapper-2">OFFER CLASS</div>
        </div>
      </div>
      {showPopup && (
        <FilterPopUp onClose={handleClosePopup} filterType={filterType} />
      )}
    </div>
  );
};

export default FilterNavbar;
