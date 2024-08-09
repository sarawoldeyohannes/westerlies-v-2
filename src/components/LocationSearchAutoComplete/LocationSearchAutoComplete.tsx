import { useState } from "react";
import { SearchLocation, searchitems } from "../../pages/Home/controller.home";
import { FaLocationDot } from "react-icons/fa6";

interface LocationSearchAutoCompleteProps {
  locationSelected: any;
}

function LocationSearchAutoComplete({
  locationSelected,
}: LocationSearchAutoCompleteProps) {
  const [locationList, setLocationList] = useState<any[]>([]);
  const [, setItems] = useState<any[]>([]);

  return (
    <div className="splash-input">
      <input
        onChange={async (e) => {
          let locationExists = await SearchLocation(e.target.value);

          if (locationExists.length > 0) {
            setLocationList(locationExists);
          } else {
            setLocationList([]);
            let searchedItemList = await searchitems(e.target.value);
            setItems(searchedItemList);
          }
        }}
        className="Location-input"
        type="text"
        placeholder="Search a city"
      />
      {locationList.length > 0 && (
        <div className="selectLocation">
          {locationList.map((location) => (
            <div
              onClick={async () => {
                locationSelected(location.place_id);
                // navigate to /search?cityId=cityDetail.id
                // navigation("/search/?cityId="+placeId);
              }}
              className="location-item"
            >
              <FaLocationDot style={{ margin: 10 }} />
              {location.description}
            </div>
          ))}
        </div>
      )}
      {/* <LocationSearchInputOnly /> */}
    </div>
  );
}

export default LocationSearchAutoComplete;
