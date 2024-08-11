import React, { useState } from "react";
import { GoogleMap, InfoWindow, LoadScript, Marker } from "@react-google-maps/api";
import "./MapComponent.css";
import { useNavigate, useNavigation } from "react-router-dom";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

export interface Location {
  lat: number;
  lng: number;
  to_be_marked?: any[];
}

const MapComponent: React.FC<Location> = (location : Location) => {
  const [activeMarker, setActiveMarker] = useState<google.maps.LatLngLiteral | null>(null);
  const [activeDescription, setActiveDescription] = useState<string | null>(null);
  const [selectedStoreId, setSelectedStoreId] = useState<number | null>(null);
  const navigate = useNavigate();
  const handleMarkerClick = (position: google.maps.LatLngLiteral, description: string, storeId: number) => {
    setActiveMarker(position);
    setActiveDescription(description || null);
    setSelectedStoreId(storeId);
  };

  const handleCloseClick = () => {
    setActiveMarker(null);
    setActiveDescription(null);
  };
  return (
    <LoadScript googleMapsApiKey="AIzaSyBXKcXjKnsuqS48iQOuXc-ruvr0vV8iCLs"
    onLoad={() => console.log("Google Maps script loaded successfully")}
    onError={(e) => console.error("Error loading Google Maps script", e)}
    >

      <GoogleMap mapContainerStyle={containerStyle} center={{lat: location.lat , lng: location.lng}} zoom={14}>
        {/* Child components, such as markers, info windows, etc. */}
        {location.to_be_marked?.map((loc, index) => {
          const fineLocation = loc.fineLocations[0];
          if (fineLocation) {
            const specificLocation = { lat: parseFloat(fineLocation.lattitude), lng: parseFloat(fineLocation.longtiude) };
            // add a random number to the key to avoid duplicate key error
            const rand = () => Math.random().toString(36).substr(2, 9);
            let index_un =  index+ loc?.storeId + parseInt(rand());

            return (
              <Marker
                key={index_un}
                position={specificLocation}
                onClick={() => handleMarkerClick(specificLocation, loc?.description , loc?.storeId)}
              />
            );
          }
          return null;
        })}

        {activeMarker && (
          <InfoWindow position={activeMarker} onCloseClick={handleCloseClick}>
            <div>
              <h3>Store Info</h3>
              <p>{activeDescription || 'No description available'}</p>
              <button style={{padding: 10,borderRadius: 5, background: 'gray', color: 'white', border: 'none'}} onClick={() =>{
                  navigate("/shopProfile/"+selectedStoreId);
              }}>Detail</button>
            </div>
          </InfoWindow>
        )}

        <></>
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;