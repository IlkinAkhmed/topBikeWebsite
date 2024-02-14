import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { openModal } from '../../reduxSlice/basketSlice'
import "./index.scss"

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { FreeMode, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'









function Modal() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [isChecked, setIsChecked] = useState(false)
    const [data, setData] = useState([])


    const basketArr = useSelector(state => state.basket.cart)
    const isModalOpen = useSelector(state => state.basket.isModalOpen)





    async function fetchData() {
        const res = await axios.get('http://localhost:7000/products')
        setData(res.data)
    }
    useEffect(() => {
        fetchData()
    }, [])


    const id = useSelector(state => state.basket.id)
    const findedDataInCart = basketArr.find(x => x._id === id)


    const subTotal = basketArr.reduce((initial, products) => initial + parseInt(products.total), 0)




    return (
        <div className='modal'>
            <i onClick={() => dispatch(openModal(!isModalOpen))} className='fa-solid fa-xmark'></i>
            {
                <>
                    <div className="top">
                        <div className="added">
                            <p>
                                <i className='fa-solid fa-check'></i>
                                {findedDataInCart && findedDataInCart.count !== 1 ? 'Already In Cart!!!. Count Of Product Increased' : 'Added To Cart Sucessfully'}
                            </p>
                            <img src={findedDataInCart && findedDataInCart.img[0]} alt="" />
                            <h5>{findedDataInCart && findedDataInCart.title}</h5>
                            <p>Price: <span style={{ color: "goldenrod" }}>${findedDataInCart && findedDataInCart.newPrice}.00</span></p>
                            <p>QTY: <span style={{ color: "goldenrod" }}>{findedDataInCart && findedDataInCart.count}</span></p>
                            <p>Product Total: <span style={{ color: "goldenrod" }}>${findedDataInCart && findedDataInCart.total}.00</span></p>
                        </div>
                        <div className="continue">
                            <p>There are <span style={{ color: "goldenrod" }}>{basketArr.length}</span> items in  your cart</p>
                            <h3>Cart Totals: <span style={{ color: "goldenrod" }}>${subTotal}.00</span></h3>
                            <button onClick={() => dispatch(openModal(!isModalOpen))}>CONTINUE SHOPPING</button>
                            <button onClick={() => { dispatch(openModal(!isModalOpen)), navigate('/cart') }}>GO TO CART</button>
                            <p>
                                <input onChange={() => setIsChecked(!isChecked)} type="checkbox" />
                                Agree with term and conditional.
                            </p>
                            <button
                                onClick={() => { navigate('/checkout'), dispatch(openModal(!isModalOpen)) }}
                                disabled={!isChecked}

                                className={`${isChecked ? '' : 'disabled-button'}`}
                            >
                                PROCEED TO CHECKOUT
                            </button>
                        </div>
                    </div>
                    <div className="bottom">
                        <i style={{ fontSize: '1.3em', fontWeight: 'bold' }}>You can aslo buy other <span style={{ color: "goldenrod" }}>{findedDataInCart.category}'s:</span></i>
                        <Swiper
                            slidesPerView={3}
                            spaceBetween={50}
                            freeMode={true}
                            pagination={{
                                clickable: true,
                            }}
                            modules={[FreeMode, Pagination]}
                            className="mySwiper-modal"
                        >
                            {
                                data
                                    .filter(x => x.category === findedDataInCart.category)
                                    .map(item => (
                                        <SwiperSlide className={'modal-card'}>
                                            <div className="modal-img">
                                                <img onClick={() => { navigate(`/details/${item._id}`), dispatch(openModal(!isModalOpen)) }} src={item.img[0]} alt="" />
                                            </div>
                                        </SwiperSlide>
                                    ))
                            }
                        </Swiper>
                    </div>
                </>
            }
        </div >
    )
}

export default Modal