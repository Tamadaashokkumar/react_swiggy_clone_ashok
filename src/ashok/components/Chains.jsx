import React, { useState, useEffect } from 'react'
import { url } from '../api'
import { IoArrowForwardOutline } from "react-icons/io5";
import { IoArrowBackOutline } from "react-icons/io5";
import { DNA } from 'react-loader-spinner'



const Chains = () => {
    const [vendorData, setVendorData] = useState([])
    const [scrollPosition, setScrollPosition] = useState(0)
    const [loading, setLoading] = useState(true)
    const vendorFirmHandler = async () => {
        try {
            const response = await fetch(`${url}/vendor/all-vendors`)
            const data = await response.json()
            setVendorData(data)
            console.log("this is api data", data)
            setLoading(false)

        } catch (err) {
            alert("failed to fetch data")
            console.log("failed to fetch data")
            setLoading(true)
        }
    }


    useEffect(() => {
        vendorFirmHandler()

    }, [])

    const handlerScroll = (value) => {
        const gallery = document.getElementById("chainGallery")
        const scrollAmount = 300;
        if (value === "left") {
            gallery.scrollTo({
                left: gallery.scrollLeft - scrollAmount,
                behavior: "smooth"
            })
        } else if (value === "right") {
            gallery.scrollTo({
                left: gallery.scrollLeft + scrollAmount,
                behavior: "smooth"
            })
        }
    }

    return (
        <div className="mediaSection">
            <div className="loadingSection">
                {loading && (
                    <>
                        <div>Your 🍝 is Loading...</div>
                        <DNA
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="dna-loading"
                            wrapperStyle={{}}
                            wrapperClass="dna-wrapper"
                        />
                    </>
                )}
            </div>

            <div className="btnSection">
                <button onClick={() => handlerScroll("left")}>
                    <IoArrowBackOutline className="arrow" />
                </button>
                <button onClick={() => handlerScroll("right")}>
                    <IoArrowForwardOutline className="arrow" />
                </button>
            </div>
            <h3>Top restaurant chains in vizag</h3>
            <section className="chainSection" id="chainGallery" onScroll={(e) => setScrollPosition(e.target.scrollLeft)}>
                {vendorData.vendors && vendorData.vendors.map(vendor => {
                    return (
                        <div className="vendorBox" key={vendor._id}>
                            {vendor.firm.map(item => {
                                return (
                                    <>
                                        <div className="firmGroup">
                                            <img src={item.image} alt={item.image} />
                                        </div>
                                    </>
                                )
                            })}
                        </div>
                    )
                })}
            </section>

        </div>
    )
}

export default Chains