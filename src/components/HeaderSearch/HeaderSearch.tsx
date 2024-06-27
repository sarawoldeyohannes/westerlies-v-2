import FreeSearch from "../FreeSearch/FreeSearch";
import LocationSearchInput from "../LocationSearchInput/LocationSearchInput";
import ProductSearchInput from "../ProductSearchInput/ProductSearchInput";

const HeaderSearch = () => {
  return (
    <div>
      <FreeSearch />
      <LocationSearchInput />
      <ProductSearchInput />
    </div>
  );
};

export default HeaderSearch;
