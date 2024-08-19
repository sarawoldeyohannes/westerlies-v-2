import { useState } from "react";
import { SearchLocation } from "../../pages/Home/controller.home";
import "./FreeSearch.css";
import { CiSearch } from "react-icons/ci";


interface locationList {
  setLocationList: (locationList: any)=> void;
  selectedLocation: string;
  setSelectedLocation: (selectedLocation: string) => void;
  page?: string;
}

const FreeSearch = ({setLocationList,selectedLocation,setSelectedLocation,page}: locationList) => {


  return (
    <div className="FreeSearch">
      {" "}
      <div className="FreeSearch-input">
        <input
          className="Location-input"
          type="text"
          value={selectedLocation}
          placeholder={page == "shopProfile" ? "Search a city" : "Click on Location or Product to start searching"}
          onChange={async(e:any) => {
            setSelectedLocation(e.target.value);
            let locationExists = await SearchLocation(e.target.value);

             if(locationExists.length > 0){
              setLocationList(locationExists)
             }else{
              setLocationList([])
              let searchedItemList = await SearchLocation(e.target.value);
              
             }
          }}
        />
        <div className="Freesearch-button">
          <CiSearch />
        </div>
      </div>
    </div>
  );
};

export default FreeSearch;
