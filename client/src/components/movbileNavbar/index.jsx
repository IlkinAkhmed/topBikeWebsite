import React, { useContext } from 'react'
import { userContext } from '../../context/userContext'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { openBasket } from '../../reduxSlice/basketSlice'
import useFetchData from '../../hooks/useFetchData'
import { NavLink } from 'react-router-dom'
import "./index.scss"

function MobileNavbar({ setisNavOpen, isNavOpen }) {
    const { currentUSer, user, wishlistArr, basketArr } = useContext(userContext)
    const basketOpen = useSelector((state) => state.basket.isOpen)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { product } = useFetchData('navbar')

    return (
        <>
            {isNavOpen && <div className='mobOverLay' onClick={() => setisNavOpen(false)}></div>}
            <div className={`mob-nav ${isNavOpen ? 'nav-open' : ''}`}>
                {
                    product && product.map(item => (
                        <div className="mob-nav-inner">
                            <div className="mob-nav-icons">

                                <i onClick={() => navigate('/wishlist')} className={item.navIcons[1]}>
                                    <div className={user && "cartMessage"}>
                                        {user && wishlistArr.length}
                                    </div>
                                </i>
                                <i onClick={() => dispatch(openBasket(!basketOpen))} className={item.navIcons[2]}>
                                    <div className={user && "cartMessage"}>
                                        {user && basketArr.length}
                                    </div>
                                </i>
                                {
                                    user
                                        ?
                                        <div className='profile-img'>
                                            <img
                                                style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                                                src={`${currentUSer.profileImg
                                                    ?
                                                    currentUSer.profileImg
                                                    :
                                                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8QATbxHgFvoPhdxKFIcSQragjLC6BcCo9FiU0koLh0FGzL3FocfsauUs53dAHfKCecaA&usqp=CAU"}`}
                                                alt="" />
                                        </div>
                                        :
                                        <i className={item.navIcons[0]}></i>
                                }
                                <i className='fa-solid fa-xmark' onClick={() => setisNavOpen(false)}></i>
                            </div>
                            <ul className="mob-nav-texts">

                                <li className='mob-nav-ul-li'>
                                    <NavLink className={'mobNavLink'} to="/">{item.navTexts[0]}</NavLink>
                                    <div className="underLine"></div>
                                </li>
                                <li className='mob-nav-ul-li'>
                                    <NavLink className={'mobNavLink'} to="/shop">{item.navTexts[1]}</NavLink>
                                    <div className="underLine"></div>
                                </li>
                                <li className='mob-nav-ul-li'>
                                    <NavLink className={'mobNavLink'} to="/about">{item.navTexts[2]}</NavLink>
                                    <div className="underLine"></div>
                                </li>
                                <li className='mob-nav-ul-li'>
                                    <NavLink className={'mobNavLink'} to="/blog">{item.navTexts[3]}</NavLink>
                                    <div className="underLine"></div>
                                </li>
                                <li className='mob-nav-ul-li'>
                                    <NavLink className={'mobNavLink'} to="/contact">{item.navTexts[4]}</NavLink>
                                    <div className="underLine"></div>
                                </li>
                            </ul>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default MobileNavbar