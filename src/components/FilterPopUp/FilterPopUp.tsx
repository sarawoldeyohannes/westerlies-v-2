import React, { useState } from "react";
import "./FilterPopUp.css";
import "./mobile.filterPopUp.css";
import { IoIosCloseCircleOutline } from "react-icons/io";
import {
  FilterItem,
  FilterPopUpProps,
  filterItems,
} from "./controller.filterPopUp";

const FilterPopUp: React.FC<FilterPopUpProps> = ({ onClose, filterType }) => {
  const [items, setItems] = useState<FilterItem[]>(filterItems);

  const handleCheckboxChange = (id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };
  const handleClearSearch = () => {
    setItems((prevItems) =>
      prevItems.map((item) => ({ ...item, checked: false }))
    );
  };
  return (
    <div className="filter-popup-container">
      <div className="overlay" onClick={onClose}></div>
      <div className="filter-popup">
        <div className="frame">
          <div className="div-wrapper">
            <div className="text-wrapper" onClick={onClose}>
              <IoIosCloseCircleOutline />
            </div>
          </div>
          <div className="text-wrapper-7">{`BY ${filterType}`}</div>
        </div>
        <div className="frame-2">
          <div className="filter-items-container">
            {items.map((item) => (
              <div key={item.id} className="filter-item">
                <input
                  type="checkbox"
                  id={`item-${item.id}`}
                  checked={item.checked}
                  onChange={() => handleCheckboxChange(item.id)}
                />
                <label htmlFor={`item-${item.id}`}>{item.label}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="frame-5">
          <div className="frame-6">
            <div className="text-wrapper-2" onClick={handleClearSearch}>
              Clear Search
            </div>
          </div>
          <div className="frame-7">
            <div className="text-wrapper-3" onClick={onClose}>
              Filter
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPopUp;
