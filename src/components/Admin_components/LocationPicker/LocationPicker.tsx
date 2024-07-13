import React, { useState } from "react";
import { GoogleMap } from "@react-google-maps/api";
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
  const [mapCenter, setMapCenter] = useState(center);
  const [zoom, setZoom] = useState(10); // Add zoom state

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      const newPosition = { lat, lng };
      setMapCenter(newPosition);
      setZoom(15); // Zoom in when a place is clicked on the map

      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: newPosition }, (results, status) => {
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
        const newPosition = { lat, lng };
        setMapCenter(newPosition);
        setZoom(15); // Zoom in when a place is selected from the search box
        onLocationSelect({
          lat,
          lng,
          address: place.formatted_address,
        });
      }
    }
  };

  return (
    <>
      <SearchBox onPlaceChanged={handlePlaceChanged} />
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={zoom}
        onClick={handleMapClick}
      ></GoogleMap>
    </>
  );
};

export default LocationPicker;
