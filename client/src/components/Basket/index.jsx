import React, { useEffect, useState } from 'react'
import "./index.scss"
import { useDispatch, useSelector } from 'react-redux'
import { openBasket } from '../../reduxSlice/basketSlice'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import Cart from './../../pages/CartPage/index';
import axios from 'axios'
import { getCookie } from '../../../helper/cookies'
import { jwtDecode } from "jwt-decode"
import toast from 'react-hot-toast'

function Basket() {
    const basketOpen = useSelector((state) => state.basket.isOpen)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [basketArr, setBasketArr] = useState([])

    const token = getCookie('token')
    const decoded = jwtDecode(token)

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:7000/users/${decoded._id}/delete`, {
                productId: id
            })
            await fetchBasketData()
            toast.success("Product has been deleted")
        } catch (error) {
            toast.error(`${error.message}`)
        }
    }

    const fetchBasketData = async () => {
        const res = await axios.get(`http://localhost:7000/users/${decoded._id}/basket`)
        setBasketArr(res.data)
    }

    useEffect(() => {
        fetchBasketData()
    }, [])


    const subTotal = basketArr.reduce((initial, value) => initial + parseInt(value.product.newPrice), 0);




    return (
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
                            <p>QTY : <span onClick={() => dispatch(increaseCount(x.product))}>+</span> {x.count} <span className={`${x.product.count === 1 ? "disabled-button-color" : ''}`} onClick={() => dispatch(decreaseCount(x.product))}> - </span></p>
                            <p>${x.product.newPrice}.00</p>
                        </div>
                        <i onClick={() => handleDelete(x.product._id)} className='fa-solid fa-trash-can'></i>
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
                        <button onClick={() => navigate('/checkout')} > CHECK OUT</button>
                    </div>
                </div>
            ) : (
                <div className="empty">
                    <h4>Your cart is empty currently.</h4>
                    <Link onClick={() => dispatch(openBasket(!basketOpen))} style={{ marginTop: "20px", textDecoration: "underLine" }} to={'/shop'}>continue shopping</Link>
                </div>
            )}
        </div>
    )
}

export default Basket