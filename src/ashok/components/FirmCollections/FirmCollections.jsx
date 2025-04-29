import React, { useState, useEffect } from "react";
import { url } from "../../api";
import { Link } from "react-router-dom";
import "./style.css";
const FirmCollections = () => {
  const [firmData, setFirmData] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("All");

  const getApiData = async () => {
    try {
      const response = await fetch(`${url}/vendor/all-vendors`);
      const data = await response.json();
      setFirmData(data.vendors);
    } catch (err) {
      alert("firm data not fetched");
      console.error("firm data not fetched", err);
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

  const regionHandler = (region) => {
    setSelectedRegion(region);
  };

  return (
    <>
      <div className="container mt-4">
        <div className="row">
          <div className="col-12">
            <h3 className="firmHeading">
              Restaurants with online food delivery in vizag
            </h3>
          </div>
          <div className="col-12 mb-4">
            <div className="BtnContainer">
              <button
                onClick={() => regionHandler("All")}
                className={`mr-2 mb-2  btn btn-outline-primary`}
                id={selectedRegion === "All" ? "allActiveBtn" : ""}
              >
                All
              </button>
              <button
                onClick={() => regionHandler("South-Indian")}
                className={`mr-2 mb-2 btn btn-outline-secondary`}
                id={selectedRegion === "South-Indian" ? "southbtn" : ""}
              >
                South-Indian
              </button>
              <button
                onClick={() => regionHandler("North-Indian")}
                className={`mr-2 mb-2 btn btn-outline-info `}
                id={selectedRegion === "North-Indian" ? "northbtn" : ""}
              >
                North-Indian
              </button>
              <button
                onClick={() => regionHandler("Bakery")}
                className={`mr-2 mb-2 btn btn-outline-success `}
                id={selectedRegion === "Bakery" ? "bakarybtn" : ""}
              >
                Bakery
              </button>
              <button
                onClick={() => regionHandler("Chinese")}
                className={`mr-2 mb-2 btn btn-outline-warning `}
                id={selectedRegion === "Chinese" ? "chinesebtn" : ""}
              >
                Chinese
              </button>
            </div>
          </div>
          <div className="container">
            <div className="row">
              {firmData.map((data) => {
                return data.firm.map((item) => {
                  if (
                    selectedRegion === "All" ||
                    item.region.includes(selectedRegion.toLocaleLowerCase())
                  ) {
                    return (
                      <div
                        className="col-12 col-sm-6  col-lg-4 col-xl-3 mb-3 m-auto"
                        key={item._id}
                      >
                        <Link
                          to={`products/${item._id}/${item.firmName}`}
                          id="link"
                        >
                          <div className="mainCotainer">
                            <div className="imageContainer">
                              <img src={item.image} alt={item.firmName} />
                              <div className="firmOffer">{item.offer}</div>
                            </div>
                            <div className="firmDetails">
                              <strong>{item.firmName}</strong>
                              <div className="firmArea">
                                {item.region.join(", ")}
                              </div>
                              <div className="firmArea"> {item.area}</div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    );
                  }
                  return null;
                });
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FirmCollections;
