import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import "./MapComponent.css";

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

}

const MapComponent: React.FC<Location> = (location) => {
  return (
    <LoadScript googleMapsApiKey="AIzaSyBXKcXjKnsuqS48iQOuXc-ruvr0vV8iCLs">
      <GoogleMap mapContainerStyle={containerStyle} center={location} zoom={10}>
        {/* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
