import { useState } from "react";
import FreeSearch from "../FreeSearch/FreeSearch";
import "./HeaderSearch.css";
import LocationSearchInput from "../LocationSearchInput/LocationSearchInput";
import ProductSearchInput from "../ProductSearchInput/ProductSearchInput";

const HeaderSearch = () => {
  const [searchType, setSearchType] = useState("free");

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
        {searchType === "location" && <LocationSearchInput />}
        {searchType === "product" && <ProductSearchInput />}
      </div>
    </div>
  );
};

export default HeaderSearch;
