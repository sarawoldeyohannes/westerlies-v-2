import "./Filter.css";
import "./mobile.filter.css";
import "./controller.Filter";
import { useState } from "react";
import FilterPopUp from "../FilterPopUp/FilterPopUp";
import { FilterProps } from "./controller.Filter";
import LocationSearchInputOnly from "../LocationSearchInput/LocationSearchInputOnly";
import { SearchLocation } from "../../pages/Home/controller.home";
const Filter = ({ type,tags,selectedLocation, setSelectedLocation,setLocationList,setSelectedTags,selectedTagsList}: FilterProps) => {
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
        {type == "Product" ? (
          <div className="nav-lists search-input">
            {" "}
            
        <input

            onChange={async(e:any) => {
         
              setSelectedLocation(e.target.value);
              let locationExists = await SearchLocation(e.target.value);
              if(locationExists.length > 0){
                setLocationList(locationExists)
              }else{
                setLocationList([])
              
              }
              
            }}
            className="Location-input"
            type="text"
            value = {selectedLocation}
            placeholder="Search a city"
            />
          </div>
        ) : (
          <div className="nav-lists" onClick={() => handleOpenPopup("PRODUCT")}>
            <div className="text-wrapper-2">product</div>
          </div>
        )}
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
        <FilterPopUp onClose={handleClosePopup} filterType={filterType} tags={tags} selectedTags={setSelectedTags} selectedTagsList={selectedTagsList}/>
      )}
    </div>
  );
};

export default Filter;
