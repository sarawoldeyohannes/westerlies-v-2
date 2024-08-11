import "./FilterNavbar.css";
import "./mobile.filterNavbar.css";
import { useState } from "react";
import FilterPopUp from "../FilterPopUp/FilterPopUp";
const FilterNavbar = ({cityId}:any) => {
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
        <div className="text-wrapper">FILTER BY:</div>
      </div>
      <div className="nav-list-frame">
        <div className="nav-lists" onClick={() => handleOpenPopup("PRODUCT")}>
          <div className="text-wrapper-2">PRODUCT</div>
        </div>
        <div
          className="nav-lists"
          onClick={() => handleOpenPopup("SOCIAL IMPACT")}
        >
          <div className="text-wrapper-2">SOCIAL IMPACT</div>
        </div>
        <div
          className="nav-lists"
          onClick={() => handleOpenPopup("OFFER CLASS")}
        >
          <div className="text-wrapper-2">OFFER CLASS</div>
        </div>
      </div>
      {showPopup && (
        <FilterPopUp onClose={handleClosePopup} filterType={filterType} tags={[]} selectedTags={"df"} selectedTagsList={[]} />
      )}
    </div>
  );
};

export default FilterNavbar;
