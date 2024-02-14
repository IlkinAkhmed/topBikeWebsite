import React from 'react'
import "./index.scss"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'

function CartProduct() {
    const basketArr = useSelector(state => state.basket.cart)
    // const subTotal = basketArr.reduce((initial, value) => initial + parseInt(value.total), 0)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    return (
        <section className='cart-product'>
            {basketArr.length > 0 ? (
                <>
                    <div className="product-details">
                        <div className="product-properties">
                            <div className="name">
                                <p>PRODUCT NAME</p>
                            </div>
                            <div className="price">
                                <p>PRICE</p>
                            </div>
                            <div className="quantity">
                                <p>QUANTITY</p>
                            </div>
                            <div className="total">
                                <p>TOTAL</p>
                            </div>
                            <span></span>
                        </div>
                        {basketArr.map(item => (
                            <div className="products" key={item._id}>
                                <div className="prod-img-name">
                                    <div className="img">

                                        <img src={item.img[0]} alt="" />
                                    </div>
                                    <p>{item.title}</p>
                                </div>
                                <div className="prod-price">
                                    <p>${item.newPrice}.00</p>
                                </div>
                                <div className="prod-qty">
                                    <div className="counter">
                                        <p className='count'>{item.count}</p>
                                        <div className="plus-minus">
                                            {/* <p onClick={() => dispatch(increaseCount(item))}>+</p> */}
                                            {/* <p onClick={() => dispatch(decreaseCount(item))}>-</p> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="prod-total">
                                    <p>${item.total}.00</p>
                                </div>
                                {/* <i onClick={() => dispatch(removeProduct(item))} className='fa-solid fa-trash-can'></i> */}
                            </div>
                        ))}
                    </div>
                    <div className="cart-buttons">
                        <button>UPDATE CART</button>
                        <button onClick={() => navigate('/shop')}>CONTINUE SHOPPING</button>
                    </div>
                    <div className="cart-total">
                        <p className='total'>CART SUBTOTALS</p>
                        <hr />
                        <div className="subtotal">
                            <p>Subtotal: </p>
                            <b>${subTotal}.00</b>
                        </div>
                        <button>PROCEED TO CHECKOUT</button>
                    </div>
                </>
            ) : (
                <div div style={{ width: "100%", textAlign: "center" }}>
                    <h1>Your Cart Is Empty Currently</h1>
                    <Link style={{ marginTop: "20px", textDecoration: "underLine" }} to={'/shop'}>continue shopping</Link>
                </div>
            )}
        </section>
    )
}

export default CartProduct