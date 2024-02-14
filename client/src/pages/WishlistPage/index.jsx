import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import WishlistHeader from '../../components/WishlistHeader'
import "./index.scss"
import { removeProduct } from '../../reduxSlice/wishlistSlice'
import { Link } from 'react-router-dom'

function Wishlist() {


    const wishlistArr = useSelector(state => state.wishlist.value)
    const dispatch = useDispatch()

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlistArr))
    }, [wishlistArr])



    return (
        <>
            <section className='wishlist'>
                <WishlistHeader />
                <div className="head">
                    <h1>My Favorites</h1>
                    <i className='fa-regular fa-heart'></i>
                </div>
                <div className="wishlist-wrapper">
                    {wishlistArr && wishlistArr.map(item => (
                        <div className="wishlist-card" key={item._id}>
                            <div className="img">
                                <img src={item.img[0]} alt="" />
                            </div>
                            <div className="product-name">
                                <p>{item.title}</p>
                            </div>
                            <div className="product-price">
                                <p>${item.newPrice}.00</p>
                            </div>
                            {/* <button onClick={() => dispatch(addToCart(item))}>Add To Cart</button> */}
                            <i onClick={() => dispatch(removeProduct(item))} className='fa-solid fa-trash-can'></i>
                        </div>
                    ))}
                    {wishlistArr && wishlistArr.length === 0 ? (
                        <>
                            <h1>Your Wishlist Cart Is Empty Currently</h1>
                            <Link style={{ marginTop: "20px", textDecoration: "underLine" }} to={'/shop'}>continue shopping</Link>
                        </>
                    ) : null}
                </div>
            </section>
        </>
    )
}

export default Wishlist