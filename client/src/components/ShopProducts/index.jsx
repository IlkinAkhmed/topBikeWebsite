import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import "./index.scss"
import useFetchData from '../../hooks/useFetchData'
import FilterArea from '../ShopFilterArea'
import { useDispatch, useSelector } from 'react-redux'
import { addToWishlist } from '../../reduxSlice/wishlistSlice'
import { useNavigate } from 'react-router'
import axios from 'axios'
import toast from "react-hot-toast"
import { userContext } from '../../context/userContext'

function ShopProducts() {
    const basketOpen = useSelector((state) => state.basket.isOpen)
    const [image, setImage] = useState(null)
    const { product, isLoading } = useFetchData('products')
    const [isFilterAreOpen, setIsFilterAreOpen] = useState(false)
    const [isSubMenuOpen, setisSubMenuOpen] = useState(false)
    const [category, setCategory] = useState('all')
    const [colorCategory, setColorCategory] = useState('all')
    const [sizeCategory, setSizeCategory] = useState('all')
    const [priceInputValue, setpriceInputValue] = useState(0)
    const { wishlistArr, handleBasket, handleWishlist, Loading, fetchWishlistData, user } = useContext(userContext)


    const [maxPrice, setMaxPrice] = useState(0);

    useEffect(() => {
        if (product) {
            const newMaxPrice = Math.max(...product.map(x => x.newPrice));
            setMaxPrice(newMaxPrice);
        }
    }, [product]);

    const isModalOpen = useSelector(state => state.basket.isModalOpen)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        fetchWishlistData()
    }, [])








    return (
        <section className='shop-products'>
            {Loading && basketOpen === false ? <div class="loader"></div> : null}
            <div className="filter-area">
                <div onClick={() => setIsFilterAreOpen(!isFilterAreOpen)} className="filter">
                    <i className="fa-solid fa-filter"></i>
                    <p>FILTER</p>
                </div>
                <div className="featured">
                    <div className="dottes">
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                        <div className="colls">
                            <span>2</span>
                            <span>3</span>
                            <span>4</span>
                            <span>5</span>
                        </div>
                    </div>
                    <div className="sort" onClick={() => setisSubMenuOpen(!isSubMenuOpen)}>
                        <p>Featured</p>
                        <i className={`fa-solid ${isSubMenuOpen ? 'fa-caret-up' : 'fa-caret-down'}`}></i>
                    </div>
                    <ul className={`featured-subMenu ${isSubMenuOpen ? 'featured-subMenu-open' : ''}`}>
                        <li style={{ cursor: 'pointer' }}>Featured</li>
                        <li style={{ cursor: 'pointer' }}>Best Selling</li>
                        <li style={{ cursor: 'pointer' }}>Alphabetically, A-Z</li>
                        <li style={{ cursor: 'pointer' }}>Price, high to low</li>
                        <li style={{ cursor: 'pointer' }}>Price, low to high</li>
                        <li style={{ cursor: 'pointer' }}>Date, old to new</li>
                        <li style={{ cursor: 'pointer' }}>Date, new to old</li>
                    </ul>
                </div>
            </div>
            <FilterArea maxPrice={maxPrice} priceInputValue={priceInputValue} setpriceInputValue={setpriceInputValue} setSizeCategory={setSizeCategory} isFilterAreaOpen={isFilterAreOpen} setCategory={setCategory} setColorCategory={setColorCategory} />
            <div className="product-area">
                {isLoading ? (
                    <h1>Loading...</h1>
                ) : (
                    product && product
                        // .filter(x => x.newPrice < parseInt(priceInputValue, 10))
                        .filter(item => item.category === category || category === 'all')
                        .filter(item => item.size === sizeCategory || sizeCategory === 'all')
                        .filter(item => item.color === colorCategory || colorCategory === 'all')
                        .map((item) => (
                            <div
                                className="newCard">
                                {item.sale ? <p className='sale'>SALE</p> : null}
                                <div className="productIcons">
                                    {Loading && basketOpen === false ? <div class="loader"></div> :
                                        <i onClick={() => handleBasket(item._id)} className={`${item.basketIcon}`}></i>
                                    }
                                    <i onClick={() => handleWishlist(item._id)} className={wishlistArr.find(x => x.product._id === item._id && user) ? item.addedHeartIcon : item.heartIcon}></i>
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
        </section>
    )
}
export default ShopProducts


