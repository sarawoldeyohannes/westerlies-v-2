import "../LocationSearchInput/LocationSearchInput.css";
import { CiSearch } from "react-icons/ci";
import Filter from "../FilterInSearch/Filter";
import FreeSearch from "../FreeSearch/FreeSearch";
import { searchitems } from "../../pages/Home/controller.home";

interface ProductSearchInputProps {
  setLocationList: (locationList: any[]) => void;
  tags: any[];
  selectedLocation: string;
  setSelectedLocation: (selectedLocation: string) => void;
  setFreeSearch: (freeSearch: string) => void;
}


const ProductSearchInput = ({tags,setFreeSearch,setSelectedLocation,selectedLocation,setLocationList}:ProductSearchInputProps) => {
 

  return (
    <div className="Location-suggestion">
      <div className="search-input">
        <div className="text-input">Product</div>

        <input  
          className="Location-input"
          type="text"
          placeholder="Search a product"
          onChange={(e) => {
            // let freeSearchResults = await searchitems(e.target.value);
            setFreeSearch(e.target.value);
          }}  
        />
      </div>
      <Filter type="Product" tags={tags} selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation} setLocationList={setLocationList} />
      <div className="search-button">
        <CiSearch />
      </div>
    </div>
  );
};

export default ProductSearchInput;
