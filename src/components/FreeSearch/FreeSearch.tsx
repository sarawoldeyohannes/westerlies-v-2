import "./FreeSearch.css";
// import { CiSearch } from "react-icons/ci";

const FreeSearch = () => {
  return (
    <div className="FreeSearch">
      {" "}
      <div className="FreeSearch-input">
        <input
          className="Location-input"
          type="text"
          placeholder="Click on Location or Product to start searching"
        />
        {/* <div className="Freesearch-button">
          <CiSearch />
        </div> */}
      </div>
    </div>
  );
};

export default FreeSearch;
