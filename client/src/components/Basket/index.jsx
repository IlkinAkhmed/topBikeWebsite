import React, { useContext, useEffect, useMemo, useState } from 'react'
import "./index.scss"
import { useDispatch, useSelector } from 'react-redux'
import { openBasket } from '../../reduxSlice/basketSlice'
import { useLocation, useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import Cart from './../../pages/CartPage/index';
import axios from 'axios'
import { getCookie } from '../../../helper/cookies'
import { jwtDecode } from "jwt-decode"
import toast from 'react-hot-toast'
import { userContext } from '../../context/userContext'

function Basket() {
    const basketOpen = useSelector((state) => state.basket.isOpen)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { decoded } = useContext(userContext)

    const { basketArr, fetchBasketData, Loading, setLoading } = useContext(userContext)

    useEffect(() => {
        fetchBasketData()
    }, [])








    async function handleDelete(id) {
        try {
            setLoading(true)
            await axios.delete(`http://localhost:7000/users/${decoded._id}/delete`, {
                data: {
                    productId: id
                }
            })
            setLoading(false)
            await fetchBasketData()
            toast.success("Product has been deleted")
        } catch (error) {
            toast.error(`${error.message}`)
        }
    }

    const modifyCount = async (id, type) => {
        try {
            if (type) {
                await axios.post(`http://localhost:7000/users/${decoded._id}/increaseCount`, {
                    productId: id
                })
                toast.success('Count Increased')
                await fetchBasketData()
            } else {
                const res = await axios.post(`http://localhost:7000/users/${decoded._id}/decreaseCount`, {
                    productId: id
                })
                res.status === 201 ? toast.error('Count must be 1 or more') : toast.success('Count Increased')
                await fetchBasketData()
            }

        } catch (error) {
            toast.error(`Error ${error.message}`)
        }
    }

    const subTotal = basketArr.reduce((initial, value) => initial + parseInt(value.product.newPrice), 0);




    return (
        <>
            {basketOpen && <div className="overLay" onClick={() => dispatch(openBasket(!basketOpen))}></div>}
            <div className={`basket ${basketOpen ? 'basket-open' : ''}`}>
                <div className="basket-head">
                    <i onClick={() => dispatch(openBasket(!basketOpen))} className='fa-solid fa-xmark'></i>
                    <h2>Shopping Cart</h2>
                    <p>{basketArr.length}</p>
                </div>
                <div className="product-container">
                    {basketArr && basketArr.map(x => (
                        <div key={x.product._id} className="product">
                            <div className='img'>
                                <img src={x.product.img[0]} alt="" />
                            </div>
                            <div className="bas-details">
                                <p onClick={() => { navigate(`/details/${x.product._id}`), dispatch(openBasket(!basketOpen)) }} >{x.product.title}</p>
                                <p>
                                    QTY :
                                    <span
                                        onClick={() => modifyCount(x._id, true)}
                                    >
                                        +
                                    </span>
                                    {x.count}
                                    <span
                                        className={`${x.product.count === 1 ? "disabled-button-color" : ''}`}
                                        onClick={() => modifyCount(x._id, false)}>
                                        -
                                    </span>
                                </p>
                                <p>${x.product.newPrice}.00</p>
                            </div>
                            <i
                                onClick={() => handleDelete(x._id)}
                                className={`fa-solid fa-trash-can`}
                            >
                                {Loading && basketOpen === true ? <div class="loader"></div> : null}
                            </i>
                        </div>
                    ))}
                </div>
                {basketArr.length > 0 ? (
                    <div className={`cart-bottom ${basketArr.length >= 6 ? 'cart-bottom-position' : ''}`}>
                        <div className="total">
                            <p>Subtotal: </p>
                            <p>${subTotal}.00</p>
                        </div>
                        <div className="view-cart">
                            <button onClick={() => { dispatch(openBasket(!basketOpen)), navigate('/cart') }}>VIEW CART</button>
                            <button onClick={() => { dispatch(openBasket(!basketOpen)), navigate('/checkout') }} > CHECK OUT</button>
                        </div>
                    </div>
                ) : (
                    <div className="empty">
                        <h4>Your cart is empty currently.</h4>
                        <Link onClick={() => dispatch(openBasket(!basketOpen))} style={{ marginTop: "20px", textDecoration: "underLine" }} to={'/shop'}>continue shopping</Link>
                    </div>
                )}
            </div>
        </>
    )
}

export default Basket