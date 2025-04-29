import React, { useState } from "react";
import { itemData } from "../../data";
import "./style.css";
const ItemsDisplay = () => {
  const [displayItem, setDisplayItem] = useState(itemData);
  return (
    <>
      <div className="itemsDisplayContainer">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="itemSection d-flex justify-content-center">
                {displayItem.map((item) => {
                  return (
                    <div className="gallery" key={item.item_img}>
                      <img src={item.item_img} alt={item.item_img} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemsDisplay;
