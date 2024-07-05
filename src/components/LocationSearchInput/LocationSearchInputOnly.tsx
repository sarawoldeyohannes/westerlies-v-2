import "./LocationSearchInput.css";
const LocationSearchInputOnly = () => {
  return (
    <div className="Location-suggestion-only">
      <div className="search-input">
        <input
          className="Location-input-only"
          type="text"
          placeholder="Type a location"
        />
      </div>
    </div>
  );
};

export default LocationSearchInputOnly;
