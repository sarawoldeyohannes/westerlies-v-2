import React from "react";
import "./Card.css";
import { CardProps } from "./controller.card";
import { Link } from "react-router-dom";

const Card: React.FC<CardProps> = ({ name, description, storePicture }) => {
  const truncatedDescription =
  description.length > 60 ? description.substring(0, 60) + "..." : description;

  return (
    <div className="card-container">
      <Link to="/shopProfile">
        <img className="card-image" src={storePicture.replace("http://", "https://")
                  .replace("api.westerlies.io", "apibeta.westerlies.com")
              } alt={name} />
      </Link>
      <div className="card-content">
        <h2 className="card-title">{name}</h2>
        <p className="card-description">{truncatedDescription}</p>
      </div>
    </div>
  );
};

export default Card;
