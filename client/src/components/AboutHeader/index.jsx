import React from 'react'
import "./index.scss"
import image from "../../../img/breadcrumb-shape-2.png"

function AboutHeader() {
    return (
        <section className='about-hader'>
            <img className='header-bg-img' src="https://topbike-store-demo.myshopify.com/cdn/shop/files/slider2.jpg?v=1613576060" alt="" />
            <h1>About US</h1>
            <p>Home / <span style={{ color: "goldenrod" }}>About Us</span></p>
            <img className='bottom-img' src={image} alt="" />
        </section>
    )
}

export default AboutHeader