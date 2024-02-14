import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useFetchData from '../../hooks/useFetchData';
import "./index.scss";
// import { addId, addToCart, openModal } from '../../reduxSlice/basketSlice';
import { addToWishlist } from '../../reduxSlice/wishlistSlice';
import { useNavigate } from 'react-router';

function NewProduct() {
    const navigate = useNavigate()
    const [image, setImage] = useState(null)
    const { product, isLoading } = useFetchData('products')
    const dispatch = useDispatch()
    const wishlistArr = useSelector(state => state.wishlist.value)
    const isModalOpen = useSelector(state => state.basket.isModalOpen)

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlistArr))
    }, [wishlistArr])
    return (
        <section className='newProduct'>
            <h1>New Product</h1>
            <div className="newWrapper">
                {isLoading ? (
                    <h1>Loading...</h1>
                ) : (
                    product && product
                        .filter(item => item.category === 'bike')
                        .map((item) => (
                            <div className="newCard" key={item._id}>
                                {item.sale ? <p className='sale'>SALE</p> : null}
                                <div className="productIcons">
                                    {/* <i onClick={() => { dispatch(addId(item._id)), dispatch(openModal(!isModalOpen)) }} className={item.basketIcon}></i> */}
                                    <i onClick={() => dispatch(addToWishlist(item))} className={wishlistArr.find(x => x._id === item._id) ? item.addedHeartIcon : item.heartIcon}></i>
                                    <i className={item.eyeIcon}></i>
                                </div>
                                <div className="img">
                                    <img src={image && image.id === item._id ? image.img : item.img[0]} alt="" />
                                </div>
                                <div className="newTexts">
                                    <p onClick={() => navigate(`/details/${item._id}`)}>{item.title}</p>
                                    <span>${item.newPrice}.00</span>
                                    {item.oldPrice ? <span className='oldPrice'>${item.oldPrice}.00</span> : null}
                                    {item.img.length === 2 ? (
                                        <>
                                            <img
                                                onClick={() => { setImage({ id: item._id, img: item.img[0] }) }}
                                                className={image && image.img === item.img[0] ? "smallimages border-color" : 'smallimages'}
                                                src={item.img[0]}
                                                alt=""
                                            />
                                            <img
                                                onClick={() => { setImage({ id: item._id, img: item.img[1] }) }}
                                                className={image && image.img === item.img[1] ? "smallimages two border-color" : 'smallimages two'}
                                                src={item.img[1]}
                                                alt=""
                                            />
                                        </>

                                    ) : null}
                                </div>
                            </div>

                        ))

                )
                }
            </div>
        </section >
    )
}

export default NewProduct