import { useEffect, useState } from "react";
import FreeSearch from "../FreeSearch/FreeSearch";
import "./HeaderSearch.css";
import LocationSearchInput from "../LocationSearchInput/LocationSearchInput";
import ProductSearchInput from "../ProductSearchInput/ProductSearchInput";
import { FaLocationDot } from "react-icons/fa6";
import { getStores_around_city, searchLocation } from "../../pages/Search/controller.search";
import { getTagsApi } from "./controller.HeaderSearch";


interface HeaderSearchProps {
  searchResult: (searchedItemList: any) => void;
}
const HeaderSearch = ({searchResult}: HeaderSearchProps) => {
  const [searchType, setSearchType] = useState("free");
  const [locationList, setLocationList] = useState<any[]>([]);
  const [tags, setTags] = useState<any[]>([]);


  useEffect(()=>{
    async function getTags(){
      let tagsList = await getTagsApi();
      setTags(tagsList);
    }
    getTags();
  },[])

  return (
    <div className="head-search">
      <div className="buttons">
        <div className="buttons-btn">
          <button onClick={() => setSearchType("location")}>Location</button>
        </div>
        <div className="buttons-btn">
          <button onClick={() => setSearchType("product")}>Product</button>
        </div>
      </div>
      <div className="inputs">
        {searchType === "free" && <FreeSearch />}
        {searchType === "location" && <LocationSearchInput setLocationList={setLocationList} tags={tags} />}
        {searchType === "product" && <ProductSearchInput />}
        <div style={{width:300, alignSelf: 'flex-start',margin:5,position:'absolute',zIndex: 2000,marginTop:75}}>
      {locationList.length > 0 &&
        <div className="selectLocation">
          { locationList.map((location) => (
            <div 
              onClick={async()=>{
                let placeId = location.place_id;

                setLocationList([]);
                let searchedItemList = await getStores_around_city(location.place_id);
                searchResult(searchedItemList)
              //  locationSelected(location.place_id);
                // navigate to /search?cityId=cityDetail.id
                // navigation("/search/?cityId="+placeId);
              }}
            className="location-item">
              <FaLocationDot style={{margin: 10}} />
              {location.description}</div>
          ))
          }
        </div>
        }
        </div>
      </div>
      
    </div>
  );
};

export default HeaderSearch;
