import React, { useState, useEffect } from "react";
import { url } from "../../api";
import { IoArrowForwardOutline } from "react-icons/io5";
import { IoArrowBackOutline } from "react-icons/io5";
import "./style.css";
import { PropagateLoader } from "react-spinners";

const Chains = () => {
  const [vendorData, setVendorData] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [loading, setLoading] = useState(true);
  const vendorFirmHandler = async () => {
    try {
      const response = await fetch(`${url}/vendor/all-vendors`);
      const data = await response.json();
      setVendorData(data);
      setLoading(false);
    } catch (err) {
      alert("failed to fetch data");
      console.log("failed to fetch data");
      setLoading(true);
    }
  };

  useEffect(() => {
    vendorFirmHandler();
  }, []);

  const handlerScroll = (value) => {
    const gallery = document.getElementById("chainGallery");
    const scrollAmount = 300;
    if (value === "left") {
      gallery.scrollTo({
        left: gallery.scrollLeft - scrollAmount,
        behavior: "smooth",
      });
    } else if (value === "right") {
      gallery.scrollTo({
        left: gallery.scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="chainsContainer mb-5 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="mediaSection">
              {loading ? (
                <div className="loadingSection">
                  <PropagateLoader />
                </div>
              ) : (
                <>
                  <div className="btnSection d-flex justify-content-between mb-3">
                    <h3 className="chainHeading">
                      Top restaurant chains in vizag
                    </h3>
                    <div>
                      <button onClick={() => handlerScroll("left")}>
                        <IoArrowBackOutline className="arrow" />
                      </button>
                      <button onClick={() => handlerScroll("right")}>
                        <IoArrowForwardOutline className="arrow" />
                      </button>
                    </div>
                  </div>
                  <section
                    className="chainSection"
                    id="chainGallery"
                    onScroll={(e) => setScrollPosition(e.target.scrollLeft)}
                  >
                    {vendorData.vendors &&
                      vendorData.vendors.map((vendor) => {
                        return (
                          <div className="vendorBox" key={vendor._id}>
                            {vendor.firm.map((item) => {
                              return (
                                <React.Fragment key={item.image}>
                                  <div className="firmGroup">
                                    <img src={item.image} alt={item.image} />
                                  </div>
                                </React.Fragment>
                              );
                            })}
                          </div>
                        );
                      })}
                  </section>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chains;
