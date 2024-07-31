import React, { useRef } from "react";
import { StandaloneSearchBox } from "@react-google-maps/api";

const SearchBox: React.FC<{
  onPlaceChanged: (place: google.maps.places.PlaceResult) => void;
}> = ({ onPlaceChanged }) => {
  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);

  const handlePlaceChanged = () => {
    if (searchBoxRef.current) {
      const places = searchBoxRef.current.getPlaces();
      if (places && places.length > 0) {
        onPlaceChanged(places[0]);
      }
    }
  };

  return (
    <StandaloneSearchBox
      onLoad={(ref) => (searchBoxRef.current = ref)}
      onPlacesChanged={handlePlaceChanged}
    >
      <input
        type="text"
        placeholder="Search for a location"
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `240px`,
          height: `32px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`,
        }}
      />
    </StandaloneSearchBox>
  );
};

export default SearchBox;
