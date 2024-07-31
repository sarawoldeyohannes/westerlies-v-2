import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import SearchBox from "../SearchBox/SearchBox";

const containerStyle = {
  width: "100%",
  height: "400px",
};

// Use string literals directly for libraries
const libraries: ("places" | "marker")[] = ["places", "marker"];

const LocationPicker: React.FC<{
  onLocationSelect: (location: any) => void;
  initialLat?: string;
  initialLng?: string;
}> = ({ onLocationSelect, initialLat, initialLng }) => {
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({
    lat: parseFloat(initialLat || "0"),
    lng: parseFloat(initialLng || "0"),
  });
  const [zoom, setZoom] = useState(20);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(
    null
  );

  useEffect(() => {
    const lat = parseFloat(initialLat || "0");
    const lng = parseFloat(initialLng || "0");

    if (!isNaN(lat) && !isNaN(lng) && lat !== 0 && lng !== 0) {
      setMapCenter({ lat, lng });
      setZoom(20);
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMapCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setZoom(20);
        },
        () => {
          setMapCenter({ lat: 0, lng: 0 });
          setZoom(2);
        }
      );
    }
  }, [initialLat, initialLng]);

  useEffect(() => {
    if (markerRef.current && mapRef.current) {
      // Update the marker position
      markerRef.current.position = new google.maps.LatLng(
        mapCenter.lat,
        mapCenter.lng
      );
      mapRef.current.setCenter(mapCenter);
    }
  }, [mapCenter]);

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      const newPosition = { lat, lng };
      setMapCenter(newPosition);
      setZoom(20);

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
        setZoom(20);

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

  const onMapLoad = async (map: google.maps.Map) => {
    mapRef.current = map;

    // Import AdvancedMarkerElement
    const { AdvancedMarkerElement } = (await google.maps.importLibrary(
      "marker"
    )) as google.maps.MarkerLibrary;

    markerRef.current = new AdvancedMarkerElement({
      map: mapRef.current,
      position: new google.maps.LatLng(mapCenter.lat, mapCenter.lng),
    });
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyBXKcXjKnsuqS48iQOuXc-ruvr0vV8iCLs"
      libraries={libraries}
    >
      <SearchBox onPlaceChanged={handlePlaceChanged} />
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={zoom}
        onClick={handleMapClick}
        onLoad={onMapLoad}
        options={{ mapId: "2d74113481ef49e9" }}
      />
    </LoadScript>
  );
};

export default LocationPicker;
