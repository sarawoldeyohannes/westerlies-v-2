import React, { useState, useEffect } from "react";
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
  const [zoom, setZoom] = useState(10);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] =
    useState<google.maps.marker.AdvancedMarkerElement | null>(null);

  useEffect(() => {
    if (map && !marker) {
      const { AdvancedMarkerElement } = google.maps.marker;
      const newMarker = new AdvancedMarkerElement({
        map,
        position: mapCenter,
        title: "Selected Location",
      });
      setMarker(newMarker);
    } else if (marker) {
      marker.position = mapCenter;
    }
  }, [map, marker, mapCenter]);

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      const newPosition = { lat, lng };
      setMapCenter(newPosition);
      setZoom(15);

      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: newPosition }, (results, status) => {
        if (status === "OK" && results && results[0].address_components) {
          const addressComponents = results[0].address_components;
          let city = "";
          let country = "";

          for (let component of addressComponents) {
            if (component.types.includes("locality")) {
              city = component.long_name;
            }
            if (component.types.includes("country")) {
              country = component.long_name;
            }
          }

          onLocationSelect({
            lat,
            lng,
            address: results[0].formatted_address,
            city,
            country,
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
        setZoom(15);

        if (place.address_components) {
          const addressComponents = place.address_components;
          let city = "";
          let country = "";

          for (let component of addressComponents) {
            if (component.types.includes("locality")) {
              city = component.long_name;
            }
            if (component.types.includes("country")) {
              country = component.long_name;
            }
          }

          onLocationSelect({
            lat,
            lng,
            address: place.formatted_address,
            city,
            country,
          });
        }
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
        onLoad={(map) => setMap(map)}
        onClick={handleMapClick}
        options={{ mapId: "2d74113481ef49e9" }}
      ></GoogleMap>
    </>
  );
};

export default LocationPicker;
