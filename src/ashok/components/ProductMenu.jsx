import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { url } from '../api'
import NavBar from './NavBar'


const ProductMenu = () => {
    const [product, setProudct] = useState([])
    const { firmId, firmName } = useParams()

    const productHanlder = async () => {
        try {
            const response = await fetch(`${url}/product/${firmId}/products`)
            const data = await response.json()
            setProudct(data.products)
        } catch (err) {
            console.log("product failed to fetch", err)
            alert("product failed to fetch")
        }
    }

    useEffect(() => {
        productHanlder()
    }, [])


    return (
        <>
            <NavBar />
            <section className="productSection">
                <h3>{firmName}</h3>
                {product.map(item => {
                    return (
                        <div className="productBox">
                            <div className="productDetials">
                                <div> <strong>{item.productName}</strong></div>
                                <div>{item.price}</div>
                                <div>{item.description}</div>
                            </div>

                            <div className="proudctGroup">
                                <img src={item.image} alt={item.firmName} />
                                <div className="addButton">ADD</div>
                            </div>
                        </div>
                    )
                })}

            </section>
        </>
    )
}

export default ProductMenu