import "./LocationSearchInput.css";
import { CiSearch } from "react-icons/ci";
const LocationSearchInputOnly = () => {
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
      <div className="search-button">
        <CiSearch />
      </div>
    </div>
  );
};

export default LocationSearchInputOnly;
