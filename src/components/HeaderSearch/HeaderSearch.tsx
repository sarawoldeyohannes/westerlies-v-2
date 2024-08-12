import { useEffect, useState } from "react";
import FreeSearch from "../FreeSearch/FreeSearch";
import "./HeaderSearch.css";
import LocationSearchInput from "../LocationSearchInput/LocationSearchInput";
import ProductSearchInput from "../ProductSearchInput/ProductSearchInput";
import { FaLocationDot } from "react-icons/fa6";
import { getStores_around_city, searchLocation } from "../../pages/Search/controller.search";
import { getTagsApi, searchStores_Combined } from "./controller.HeaderSearch";
import { searchitems } from "../../pages/Home/controller.home";


interface HeaderSearchProps {
  searchResult: (searchedItemList: any) => void;
  cityId: string;
  setCityId: (cityId: string) => void;
}
const HeaderSearch = ({searchResult,cityId,setCityId}: HeaderSearchProps) => {
  const [searchType, setSearchType] = useState("free");
  const [locationList, setLocationList] = useState<any[]>([]);
  const [tags, setTags] = useState<any[]>([]);
  const [selectedLocation,setSelectedLocation] = useState("");
  const [selectedLocationId,setSelectedLocationId] = useState("");
  const [freeSearchValue,setFreeSearchValue] = useState("");
  const [selectedTags,setSelectedTags] = useState<any[]>([]);
  
  useEffect(()=>{
    async function getTags(){
      let tagsList = await getTagsApi();
      setTags(tagsList);
    }
    const params = new URLSearchParams(window.location.search);
     
    let cityIds: string = params.get("cityId")?.toString() as string;
    
    if(cityIds){
    setSelectedLocationId(cityIds);
    }
    // async function freeSearch(){
    //   //        let {tagId, cityId , socialImpact, offersClasses,freeSearch } = body;
    //   const params = new URLSearchParams(window.location.search);
     
    //   let cityIds: string = params.get("cityId")?.toString() as string;
    //   setSelectedLocationId(cityIds);
    // let search_body =  {
    //   "freeSearch": freeSearchValue,
    //   "cityId": cityIds,
    //   "socialImpact": selectedTags
    //   }
    //   let searchResult_data = await searchStores_Combined(search_body);
    //   console.log(searchResult_data);
    //   searchResult(searchResult_data);
    // }

    // freeSearch();
    
    getTags();
  },[])


    useEffect(()=>{
        async function freeSearch(){
          //        let {tagId, cityId , socialImpact, offersClasses,freeSearch } = body;
          let has_no_class = selectedTags.includes(1001) ? true : false;
          let has_class = selectedTags.includes(1000) ? true : false;
          if(has_no_class){
            let index = selectedTags.indexOf(1001);
            selectedTags.splice(index,1);
          }

          if(has_class){
            let index = selectedTags.indexOf(1000);
            selectedTags.splice(index,1);
          }

            if(selectedLocationId !== "" || selectedTags.length > 0 || freeSearchValue !== ""){
        let search_body =  {
          "freeSearch": freeSearchValue,
          "cityId": selectedLocationId,
          "socialImpact": selectedTags
          }
          let searchResult_data = await searchStores_Combined(search_body);
          console.log(searchResult_data);
          let final_has_no_class = (has_class == false && has_no_class == false) ? "none" : has_class ? 1 : 0;
          if(final_has_no_class === "none"){

          }else{
            
            searchResult_data =   searchResult_data.filter((item:any) => {
                console.log("item.hasClasses:", item.hasClasses, "final_has_no_class:", final_has_no_class);

                return item.hasClasses == final_has_no_class;
              })
              console.log("test: "+final_has_no_class ,searchResult_data);
         
          }
         
          searchResult(searchResult_data);
        }
        }

        if(selectedLocationId != cityId){
          setCityId(selectedLocationId);
        }

        freeSearch();

    },[freeSearchValue,selectedLocationId,selectedTags])



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
        {searchType === "free" && <FreeSearch setLocationList={setLocationList} selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation} />}
        {searchType === "location" && <LocationSearchInput setSelectedTags={setSelectedTags} selectedTagsList={selectedTags}  selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation} setLocationList={setLocationList} tags={tags} />}
        {searchType === "product" && <ProductSearchInput setSelectedTags={setSelectedTags} selectedTagsList={selectedTags}  setFreeSearch={setFreeSearchValue}  selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation} setLocationList={setLocationList} tags={tags} />}
        <div style={{width:300, alignSelf: 'flex-start',margin:5,position:'absolute',zIndex: 2000,marginTop:75}}>
      {locationList.length > 0 &&
        <div className="selectLocation">
          { locationList.map((location) => (
            <div 
              onClick={async()=>{
               
                let placeId = location.place_id;
                setSelectedLocationId(location.place_id);
                setSelectedLocation(location.description);
                setLocationList([]);
                // let searchedItemList = await getStores_around_city(location.place_id);
                // searchResult(searchedItemList)
              //  locationSelected(location.place_id);
                // navigate to /search?cityId=cityDetail.id
                // navigation("/search/?cityId="+placeId);
              }}
            className="location-item">
              <FaLocationDot style={{margin: 10}} />
              {location.description }</div>
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
