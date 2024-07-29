import { useState } from "react";
import { SearchLocation } from "../../pages/Home/controller.home";
import "./FreeSearch.css";
import { CiSearch } from "react-icons/ci";


interface locationList {
  setLocationList: (locationList: any)=> void;
  selectedLocation: string;
  setSelectedLocation: (selectedLocation: string) => void;
}

const FreeSearch = ({setLocationList,selectedLocation,setSelectedLocation}: locationList) => {


  return (
    <div className="FreeSearch">
      {" "}
      <div className="FreeSearch-input">
        <input
          className="Location-input"
          type="text"
          value={selectedLocation}
          placeholder="Click on Location or Product to start searching"
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
