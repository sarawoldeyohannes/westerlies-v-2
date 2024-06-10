import React from "react";
import "./Card.css";
import { CardProps } from "./controller.card";
import { Link } from "react-router-dom";

const Card: React.FC<CardProps> = ({ title, description, imageUrl }) => {
  return (
    <div className="card-container">
      <Link to="/shopProfile">
        <img className="card-image" src={imageUrl} alt={title} />
      </Link>
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="card-description">{description}</p>
      </div>
    </div>
  );
};

export default Card;
