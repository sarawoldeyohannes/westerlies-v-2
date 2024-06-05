import "./LocationSearchInput.css";
import { CiSearch } from "react-icons/ci";

const LocationSearchInput = () => {
  return (
    <div className="Location-suggestion">
      <input
        className="Location-input"
        type="text"
        placeholder="Search a city"
      />
      <div className="search-button">
        <CiSearch />
      </div>
    </div>
  );
};

export default LocationSearchInput;
