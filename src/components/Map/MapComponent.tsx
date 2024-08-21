import React, { useEffect, useState } from "react";
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
  shopeProfile?: boolean;
  city?: string;
}

const MapComponent: React.FC<Location> = (location : Location) => {
  const [activeMarker, setActiveMarker] = useState<google.maps.LatLngLiteral | null>(null);
  const [activeDescription, setActiveDescription] = useState<string | null>(null);
  const [activeStoreName, setActiveStoreName] = useState<string | null>(null);
  const [selectedStoreId, setSelectedStoreId] = useState<number | null>(null);
  const [zoom,setZoom] = useState(11);
  const navigate = useNavigate();
  const handleMarkerClick = (position: google.maps.LatLngLiteral, loc: any, storeId: number) => {
    console.log("alert everything: ", loc);
    if(!location.shopeProfile){
    setActiveMarker(position);
    setActiveDescription(loc.primaryTag2 || null);
    setActiveStoreName(loc.name);
    setSelectedStoreId(storeId);
  }
  };

  useEffect(()=>{
    console.log("ALLLL: ", location);
  },[])

  const handleCloseClick = () => {
    setActiveMarker(null);
    setActiveDescription(null);
  };
  return (
  

      <GoogleMap mapContainerStyle={containerStyle} center={{lat: location.lat , lng: location.lng}} zoom={11}>
        {/* Child components, such as markers, info windows, etc. */}
        {location.to_be_marked?.map((loc, index) => {
          const fineLocation = loc.fineLocations? loc.fineLocations[0] : loc.fineLocation;
          if (fineLocation) {
            const specificLocation = { lat: parseFloat(fineLocation.lattitude), lng: parseFloat(fineLocation.longtiude) };
            // add a random number to the key to avoid duplicate key error
            const rand = () => Math.random().toString(36).substr(2, 9);
            let index_un =  index+ (loc?.storeId || fineLocation.storeId) + parseInt(rand());
            // console.log("LOOOOC: ", loc?.storeId);

            return (
              <Marker
                key={index_un}
                position={specificLocation}
                onClick={() => handleMarkerClick(specificLocation, loc , loc?.storeId)}
              />
            );
          }
          return null;
        })}

        {activeMarker && (
          <InfoWindow position={activeMarker} onCloseClick={handleCloseClick}>
            <div>
              <h3  onClick={() =>{
                      window.open("/shopProfile/" + `${selectedStoreId}`, "_blank");

                  // navigate("/shopProfile/"+selectedStoreId);
              }}> {activeStoreName || "NA"} </h3>
              <p>{activeDescription || ''}</p>
              
            </div>
          </InfoWindow>
        )}

        <></>
      </GoogleMap>
  );
};

export default MapComponent;