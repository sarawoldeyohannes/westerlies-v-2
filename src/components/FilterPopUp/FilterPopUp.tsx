import React, { useEffect, useState } from "react";
import "./FilterPopUp.css";
import "./mobile.filterPopUp.css";
import { IoIosCloseCircleOutline } from "react-icons/io";
import {
  FilterItem,
  FilterPopUpProps,
  filterItems,
} from "./controller.filterPopUp";

const FilterPopUp: React.FC<FilterPopUpProps> = ({ onClose, filterType, tags,selectedTags,selectedTagsList }) => {
  const [items, setItems] = useState<FilterItem[]>(filterItems);
  const [finalTags, setFinalTags] = useState<FilterItem[]>([]);

  const handleCheckboxChange = (id: number) => {

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );


    if(selectedTagsList.includes(id)){
      let index = selectedTagsList.indexOf(id);
      selectedTagsList.splice(index,1);

    }
    selectedTags([...selectedTagsList, id]);  
    
    
  };
  const handleClearSearch = () => {
    // setItems((prevItems) =>
    //   prevItems.map((item) => ({ ...item, checked: false }))
    // );
    setFinalTags((prevItems) =>
      prevItems.map((item) => ({ ...item, checked: false }))

    );
    selectedTags([]);
  };

  useEffect(()=>{




    let localTagData: any = [];
    tags.map((tag) => {
      
      if(tag.tagTypeId == 2 && filterType == "SOCIAL IMPACT"){
        localTagData.push(tag);
      }
      if(tag.tagTypeId == 1 && filterType == "PRODUCT"){
        localTagData.push(tag);
      }
        

    });

    setFinalTags(localTagData);

  },[])


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
            {finalTags.map((item: any) => (
              <div key={item.id} className="filter-item">
                <input
                  type="checkbox"
                  id={`item-${item.tagId}`}
                  checked={item.checked}
                  onChange={() => handleCheckboxChange(item.tagId)}
                />
                <label htmlFor={`item-${item.tagId}`}>{item.tagName}</label>
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
