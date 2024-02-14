import React from 'react'
import image from "../../../img/breadcrumb-shape-2.png"
import "./index.scss"

function CartHeader() {
    return (
        <header className='cart-header'>
            <img className='header-bg-img' src="https://topbike-store-demo.myshopify.com/cdn/shop/files/Banner-L2P.jpg?v=1613576665" alt="" />
            <h1>Cart</h1>
            <p>Home / <span style={{ color: "goldenrod" }}>Cart</span></p>
            <img className='bottom-img' src={image} alt="" />
        </header>
    )
}

export default CartHeader