import React from 'react'
import "./index.scss"
import image from "../../../img/breadcrumb-shape-2.png"

function WishlistHeader() {
    return (
        <section className='wishlist-header'>
            <img className='header-bg-img' src="https://topbike-store-demo.myshopify.com/cdn/shop/files/slider2.jpg?v=1613576060" alt="" />
            <h1>Wishlist</h1>
            <p>Home / <span style={{ color: "goldenrod" }}>Wishlist</span></p>
            <img className='bottom-img' src={image} alt="" />
        </section>
    )
}

export default WishlistHeader