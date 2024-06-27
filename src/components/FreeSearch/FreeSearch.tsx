import "./FreeSearch.css";
import { CiSearch } from "react-icons/ci";

const FreeSearch = () => {
  return (
    <div className="FreeSearch">
      {" "}
      <div className="FreeSearch-input">
        <input
          className="Location-input"
          type="text"
          placeholder="Type a location or product"
        />
        <div className="Freesearch-button">
          <CiSearch />
        </div>
      </div>
    </div>
  );
};

export default FreeSearch;
