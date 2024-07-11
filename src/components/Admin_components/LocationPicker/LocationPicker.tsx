import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import SearchBox from "../SearchBox/SearchBox ";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const LocationPicker: React.FC<{
  onLocationSelect: (location: any) => void;
}> = ({ onLocationSelect }) => {
  const [markerPosition, setMarkerPosition] = React.useState(center);

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setMarkerPosition({ lat, lng });

      // Geocoding to get the address
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === "OK" && results) {
          onLocationSelect({
            lat,
            lng,
            address: results[0].formatted_address,
          });
        }
      });
    }
  };

  const handlePlaceChanged = (place: google.maps.places.PlaceResult) => {
    if (place.geometry) {
      const lat = place.geometry.location?.lat();
      const lng = place.geometry.location?.lng();
      if (lat && lng) {
        setMarkerPosition({ lat, lng });
        onLocationSelect({
          lat,
          lng,
          address: place.formatted_address,
        });
      }
    }
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyBXKcXjKnsuqS48iQOuXc-ruvr0vV8iCLs"
      libraries={["places"]}
    >
      <SearchBox onPlaceChanged={handlePlaceChanged} />
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={markerPosition}
        zoom={10}
        onClick={handleMapClick}
      >
        <Marker position={markerPosition} />
      </GoogleMap>
    </LoadScript>
  );
};

export default LocationPicker;
