import "../LocationSearchInput/LocationSearchInput.css";
import { CiSearch } from "react-icons/ci";
import Filter from "../FilterInSearch/Filter";
const ProductSearchInput = () => {
  return (
    <div className="Location-suggestion">
      <div className="search-input">
        <div className="text-input">Product</div>

        <input
          className="Location-input"
          type="text"
          placeholder="Search a product"
        />
      </div>
      <Filter type="Product" />
      <div className="search-button">
        <CiSearch />
      </div>
    </div>
  );
};

export default ProductSearchInput;
