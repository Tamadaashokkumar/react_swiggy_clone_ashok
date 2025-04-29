import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { url } from "../../api";
import NavBar from "../NavBar/NavBar";
import "./style.css";
const ProductMenu = () => {
  const [product, setProudct] = useState([]);
  const { firmId, firmName } = useParams();

  const productHanlder = async () => {
    try {
      const response = await fetch(`${url}/product/${firmId}/products`);
      const data = await response.json();
      setProudct(data.products);
    } catch (err) {
      console.log("product failed to fetch", err);
      alert("product failed to fetch");
    }
  };

  useEffect(() => {
    productHanlder();
  }, []);

  return (
    <>
      <NavBar />
      <div className="container mt-5">
        <div className="row">
          <div className="col-12">
            <section className="productSection d-flex flex-column">
              <h3 className="mb-4 restaurantName ">
                {firmName.toLocaleUpperCase()}
              </h3>
              {product.map((item) => {
                return (
                  <div className="ProductContainer d-flex justify-content-between bg-light mb-3 p-4 border shadow-lg">
                    <div className="productDetials">
                      <div className="mb-4 font-weight-bold productName">
                        {" "}
                        <strong>{item.productName}</strong>
                      </div>
                      <div className="itemtext1 mb-1">{item.price}</div>
                      <div className="itemtext2">{item.description}</div>
                    </div>

                    <div className="ImageContainer text-center">
                      <img src={item.image} alt={item.firmName} />
                      <div className="addButtons">ADD</div>
                    </div>
                  </div>
                );
              })}
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductMenu;
