import React from "react";
import "./Card.css";
import { CardProps } from "./controller.card";
import { Link, useNavigate } from "react-router-dom";

const Card = ({ name, description, storePicture , storeId,primaryTag2 }:CardProps) => {

  // const navigate = useNavigate();
  
  return (
    <div onClick={()=>{

      
       window.open('/shopProfile/'+storeId, '_blank');

    }} className="card-container">
      <span>
        <img className="card-image" src={storePicture?.replace("http://", "https://")
                  .replace("api.westerlies.io", "apibeta.westerlies.com").replace("/api/","/images/")
              } alt={name} />
      </span>
      <div className="card-content">
        <h2 className="card-title">{name}</h2>
        <p className="card-description">{primaryTag2?.tagName || ""}</p>
      </div>
    </div>
  );
};

export default Card;
