import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { url } from "../../api";
import NavBar from "../NavBar/NavBar";
import { useCart } from "../../context/CartContext"; // 👈
import "./style.css";
import { PropagateLoader } from "react-spinners";

const ProductMenu = () => {
  const [product, setProudct] = useState([]);
  const { firmId, firmName } = useParams();
  const [loading, setLoading] = useState(true);
  const { addToCart, cartItems, updateQuantity } = useCart(); // 👈

  const productHanlder = async () => {
    try {
      const response = await fetch(`${url}/product/${firmId}/products`);
      const data = await response.json();
      setProudct(data.products);
      setLoading(false);
    } catch (err) {
      console.log("product failed to fetch", err);
      alert("product failed to fetch");
    }
  };

  useEffect(() => {
    productHanlder();
  }, []);

  const getQty = (id) => {
    const item = cartItems.find((i) => i.id === id);
    return item ? item.qty : 0;
  };

  return (
    <>
      <NavBar />
      {loading ? (
        <div className="loadingSections">
          <PropagateLoader />
        </div>
      ) : (
        <div className="container mt-5">
          <div className="row">
            <div className="col-12">
              <section className="productSection d-flex flex-column">
                <h3 className="mb-4 restaurantName ">
                  {firmName.toUpperCase()}
                </h3>
                {product.map((item) => {
                  const quantity = getQty(item._id);
                  return (
                    <div
                      key={item._id}
                      className="ProductContainer d-flex justify-content-between align-items-center bg-light mb-3 p-4 border shadow-lg"
                    >
                      <div className="productDetials">
                        <div className="mb-2 productName font-weight-bold">
                          <strong>{item.productName}</strong>
                        </div>
                        <div className="itemtext1 mb-1">₹{item.price}</div>
                        <div className="itemtext2">{item.description}</div>
                      </div>

                      <div className="ImageContainer text-center d-flex flex-column">
                        <img
                          src={item.image}
                          alt={item.firmName}
                          className="img-fluid"
                          style={{ maxHeight: "100px", borderRadius: "8px" }}
                        />
                        {quantity === 0 ? (
                          <button
                            className="btn btn-sm btn-outline-primary mt-2"
                            onClick={() =>
                              addToCart({
                                id: item._id,
                                name: item.productName,
                                price: item.price,
                                image: item.image,
                              })
                            }
                          >
                            ADD
                          </button>
                        ) : (
                          <div className="d-flex align-items-center justify-content-center mt-2">
                            <button
                              className="btn btn-sm btn-success pr-2 pl-2"
                              onClick={() =>
                                updateQuantity(item._id, quantity - 1)
                              }
                            >
                              -
                            </button>
                            <span className="mx-2">{quantity}</span>
                            <button
                              className="btn btn-sm btn-success pr-2 pl-2"
                              onClick={() =>
                                updateQuantity(item._id, quantity + 1)
                              }
                            >
                              +
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductMenu;
