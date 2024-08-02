import "./LocationSearchInput.css";
import { CiSearch } from "react-icons/ci";
import Filter from "../FilterInSearch/Filter";
import LocationSearchAutoComplete from "../LocationSearchAutoComplete/LocationSearchAutoComplete";
import { SearchLocation, searchitems } from "../../pages/Home/controller.home";
import { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";

interface LocationSearchInputProps {
  setLocationList: (locationList: any[]) => void;
  tags: any[];
  selectedLocation: string;
  setSelectedLocation: (selectedLocation: string) => void;
  setSelectedTags: (selectedTags: any) => void;
  selectedTagsList: any[];
}

const LocationSearchInput = ({setLocationList,tags,selectedLocation,setSelectedLocation,setSelectedTags,selectedTagsList}:LocationSearchInputProps) => {

  const [items, setItems] = useState<any[]>([]);
  
  return (
    <div className="Location-suggestion">
      <div className="search-input">
        <div className="text-input">City</div>
        
        <input
          onChange={async(e) => {
              setSelectedLocation(e.target.value);
             let locationExists = await SearchLocation(e.target.value);

             if(locationExists.length > 0){
              setLocationList(locationExists)
             }else{
              setLocationList([])
              let searchedItemList = await searchitems(e.target.value);
              setItems(searchedItemList);
             }
            
          }}
          className="Location-input"
          type="text"
          value = {selectedLocation}
          placeholder="Search a city"
        />
        {/* {locationList.length > 0 &&
        <div className="selectLocation">
          { locationList.map((location) => (
            <div 
              onClick={async()=>{
                let placeId = location.place_id;
               // locationSelected(location.place_id);
                // navigate to /search?cityId=cityDetail.id
                // navigation("/search/?cityId="+placeId);
              }}
            className="location-item">
              <FaLocationDot style={{margin: 10}} />
              {location.description}</div>
          ))
          }
        </div>
        } */}
     
      </div>
      <Filter tags={tags} selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation} setLocationList={setLocationList} setSelectedTags={setSelectedTags} selectedTagsList={selectedTagsList} />
      <div className="search-button">
        <CiSearch />
      </div>
    </div>
  );
};

export default LocationSearchInput;
