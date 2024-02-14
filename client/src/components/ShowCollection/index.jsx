import React from 'react'
import "./index.scss"
import image from "../../../img/breadcrumb-shape-2.png"

function Collection() {
    return (
        <>
            <section className='collection'>
                <img className='backImg' src="https://topbike-store-demo.myshopify.com/cdn/shop/files/Biking-Basics-5-Essential-Bike-Tools-to-Take-with-You-on-a-Cycling-Adventure.jpg?v=1613576668" alt="" />
                <p>A NEW COLLECTION</p>
                <span>SALE UP TO 30%</span>
                <button>SHOP NOW</button>
                <img className='top-img' src={image} alt="" />
                <img className='bottom-img' src={image} alt="" />
            </section>

        </>
    )
}

export default Collection