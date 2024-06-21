import "./LocationSearchInput.css";
import { CiSearch } from "react-icons/ci";
import Filter from "../FilterInSearch/Filter";
const LocationSearchInput = () => {
  return (
    <div className="Location-suggestion">
      <div className="search-input">
        <div className="text-input">City</div>

        <input
          className="Location-input"
          type="text"
          placeholder="Type a location"
        />
      </div>
      <Filter />
      <div className="search-button">
        <CiSearch />
      </div>
    </div>
  );
};

export default LocationSearchInput;
