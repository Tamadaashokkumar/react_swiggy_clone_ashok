import React, { useState, useEffect } from 'react'
import { url } from '../api'
import { Link } from 'react-router-dom'

const FirmCollections = () => {

    const [firmData, setFirmData] = useState([])
    const [selectedRegion, setSelectedRegion] = useState("All")

    const getApiData = async () => {
        try {
            const response = await fetch(`${url}/vendor/all-vendors`)
            const data = await response.json()
            setFirmData(data.vendors)
            console.log(data)
        } catch (err) {
            alert("firm data not fetched")
            console.error("firm data not fetched", err)
        }
    }

    useEffect(() => {
        getApiData()
    }, [])


    const regionHandler = (region) => {
        setSelectedRegion(region)
    }

    return (
        <>
            <h3>Restaurants with online food delivery in vizag</h3>
            <div className='regionBtn'>
                <button onClick={() => regionHandler("All")} className={selectedRegion === "All" ? "activeButton" : ""}>All</button>
                <button onClick={() => regionHandler("South-Indian")} className={selectedRegion === "South-Indian" ? "activeButton" : ""}>South-Indian</button>
                <button onClick={() => regionHandler("North-Indian")} className={selectedRegion === "North-Indian" ? "activeButton" : ""}>North-Indian</button>
                <button onClick={() => regionHandler("Bakery")} className={selectedRegion === "Bakery" ? "activeButton" : ""}>Bakery</button>
                <button onClick={() => regionHandler("Chinese")} className={selectedRegion === "Chinese" ? "activeButton" : ""}>Chinese</button>
            </div>
            <section className="firmSection">
                {firmData.map(data => {
                    return data.firm.map(item => {
                        if (selectedRegion === "All" || item.region.includes(selectedRegion.toLocaleLowerCase())) {
                            return (
                                <Link to={`products/${item._id}/${item.firmName}`} className="link">
                                    <div className="firmBox">
                                        <div className="firmGroup">
                                            <img src={`${url}/uploads/${item.image}`} alt={item.firmName} />
                                            <div className="firmOffer">
                                                {item.offer}
                                            </div>
                                        </div>
                                        <div className="firmDetails">
                                            <strong>{item.firmName}</strong>
                                            <div className="firmArea">{item.region.join(", ")}</div>
                                            <div className="firmArea"> {item.area}</div>
                                        </div>
                                    </div>
                                </Link>

                            )
                        }
                        return null
                    })

                })}
            </section>
        </>
    )
}

export default FirmCollections