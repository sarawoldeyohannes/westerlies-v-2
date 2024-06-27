import "./Filter.css";
import "./mobile.filter.css";
import "./controller.Filter";
import { useState } from "react";
import FilterPopUp from "../FilterPopUp/FilterPopUp";
import { FilterProps } from "./controller.Filter";
const Filter = ({ type }: FilterProps) => {
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
    <div className="filter">
      <div className="city-frame">
        <div className="text-wrapper">FILTER BY:</div>
      </div>
      <div className="nav-list-frame">
        <div
          className={type == "Product" ? "nav-listsx" : "nav-lists"}
          onClick={() => handleOpenPopup("PRODUCT")}
        >
          <div className="text-wrapper-2">product</div>
        </div>
        <div
          className="nav-lists"
          onClick={() => handleOpenPopup("SOCIAL IMPACT")}
        >
          <div className="text-wrapper-2">social impact</div>
        </div>
        <div
          className="nav-lists offer-class"
          onClick={() => handleOpenPopup("OFFER CLASS")}
        >
          <div className="text-wrapper-2">offer class</div>
        </div>
      </div>
      {showPopup && (
        <FilterPopUp onClose={handleClosePopup} filterType={filterType} />
      )}
    </div>
  );
};

export default Filter;
