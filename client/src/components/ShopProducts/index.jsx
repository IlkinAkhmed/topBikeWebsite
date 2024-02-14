import React, { useEffect, useMemo, useRef, useState } from 'react'
import "./index.scss"
import useFetchData from '../../hooks/useFetchData'
import FilterArea from '../ShopFilterArea'
import { useDispatch, useSelector } from 'react-redux'
import { addToWishlist } from '../../reduxSlice/wishlistSlice'
import { useNavigate } from 'react-router'
import axios from 'axios'
import toast from "react-hot-toast"
import { getCookie } from '../../../helper/cookies'
import { jwtDecode } from "jwt-decode"

function ShopProducts() {
    const [image, setImage] = useState(null)
    const { product, isLoading } = useFetchData('products')
    const [isFilterAreOpen, setIsFilterAreOpen] = useState(false)
    const [isSubMenuOpen, setisSubMenuOpen] = useState(false)
    const [category, setCategory] = useState('all')
    const [colorCategory, setColorCategory] = useState('all')
    const [sizeCategory, setSizeCategory] = useState('all')
    const [priceInputValue, setpriceInputValue] = useState(0)

    const [maxPrice, setMaxPrice] = useState(0);

    useEffect(() => {
        if (product) {
            const newMaxPrice = Math.max(...product.map(x => x.newPrice));
            setMaxPrice(newMaxPrice);
        }
    }, [product]);








    const wishlistArr = useSelector(state => state.wishlist.value)
    const isModalOpen = useSelector(state => state.basket.isModalOpen)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        setpriceInputValue(maxPrice && maxPrice + 1)
        localStorage.setItem('wishlist', JSON.stringify(wishlistArr))
    }, [])

    const token = getCookie('token')
    const decoded = jwtDecode(token)

    const handleBasket = async (id) => {
        try {
            const res = await axios.post(`http://localhost:7000/users/${decoded._id}/addBasket`, {
                productId: id
            })
            // dispatch(openModal(!isModalOpen))
            // dispatch(addId(id))
            res.status===201 ? toast.success('Already in Cart, Count increased') : toast.success('Added To Cart')

        } catch (error) {
            toast.error(`Error: ${error.message} `)
        }
    }





    return (
        <section className='shop-products'>
            <div className="filter-area">
                <div onClick={() => setIsFilterAreOpen(!isFilterAreOpen)} className="filter">
                    <i class="fa-solid fa-filter"></i>
                    <p>FILTER</p>
                </div>
                <div className="featured">
                    <div className="dottes">
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                        <div className="colls">
                            <span>2</span>
                            <span>3</span>
                            <span>4</span>
                            <span>5</span>
                        </div>
                    </div>
                    <div className="sort" onClick={() => setisSubMenuOpen(!isSubMenuOpen)}>
                        <p>Featured</p>
                        <i class={`fa-solid ${isSubMenuOpen ? 'fa-caret-up' : 'fa-caret-down'}`}></i>
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
                                    <i onClick={() => handleBasket(item._id)} className={item.basketIcon}></i>
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
        </section>
    )
}
export default ShopProducts


