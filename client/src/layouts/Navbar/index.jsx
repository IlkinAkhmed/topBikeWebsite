import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"
import "./index.scss"
import { NavLink, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import useFetchData from '../../hooks/useFetchData'
import { useDispatch, useSelector } from 'react-redux'
import { openBasket } from '../../reduxSlice/basketSlice'
import Search from '../../components/Search'
import { userContext } from '../../context/userContext'
import toast from 'react-hot-toast'

function Navbar() {
  const { user, setToken, setUser, basketArr, isLoginOpen, setIsLoginOpen, wishlistArr, fetchWishlistData } = useContext(userContext);

  const basketOpen = useSelector((state) => state.basket.isOpen)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { product } = useFetchData('navbar')


  const [isSearchOpen, setisSearchOpen] = useState(false)
  const [isLoginDropDownOpen, setIsLoginDropDownOpen] = useState(false)
  const [scroll, setScroll] = useState(false);


  useEffect(() => {
    fetchWishlistData()
  }, [])

  function handleScroll() {
    if (window.scrollY > 120) {
      setScroll(true)
    } else {
      setScroll(false)
    }
  }

  const handleLogout = () => {
    Cookies.remove('token');
    setUser(null);
    setToken(null);
    toast.success('Logged Out');
    setIsLoginDropDownOpen(false);
  };


  useEffect(() => {

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])






  return (
    <nav className={scroll ? 'navbar scroll' : 'navbar'}>
      {product && product.map(item => (
        <>
          <div className="nav-inner" >
            <div className="logo">
              <img onClick={() => navigate('/')} src={item.logo} alt="" />
            </div>
          </div>
          <ul className='nav-texts'>
            <li className='nav-ul-li'>
              <NavLink className={'navLink'} to="/">{item.navTexts[0]}</NavLink>
              <div className="underLine"></div>
            </li>
            <li className='nav-ul-li'>
              <div className="message">
                {item.hot ? 'Hot' : ''}
              </div>
              <NavLink className={'navLink'} to="/shop">{item.navTexts[1]}</NavLink>
              <div className="underLine"></div>
            </li>
            <li className='nav-ul-li'>
              <NavLink className={'navLink'} to="/about">{item.navTexts[2]}</NavLink>
              <div className="underLine"></div>
            </li>
            <li className='nav-ul-li'>
              <NavLink className={'navLink'} to="/contact">{item.navTexts[4]}</NavLink>
              <div className="underLine"></div>
            </li>
          </ul>
          <div className="nav-icons">
            <i onClick={() => setisSearchOpen(!isSearchOpen)} className="fa-solid fa-search"></i>
            {
              user
                ?
                <div className='profile-img'>
                  {isLoginDropDownOpen && <div className="overLay" onClick={() => setIsLoginDropDownOpen(!isLoginDropDownOpen)} ></div>}

                  <img
                    onClick={() => setIsLoginDropDownOpen(!isLoginDropDownOpen)}
                    style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                    src={`${user.profileImg
                      ?
                      user.profileImg
                      :
                      "https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg"}`}
                    alt="" />
                  <div className={`profile-sub-menu ${isLoginDropDownOpen && 'profileActive'}`}>

                    <div>
                      <i className='fa-solid fa-user'></i>
                      <p>Profile</p>
                    </div>
                    <div onClick={handleLogout}>
                      <i className="fa-solid fa-arrow-right-from-bracket"></i>
                      <p>Log Out</p>
                    </div>
                    <div>
                      <i className="fa-regular fa-image"></i>
                      <p>Change Profile Image</p>
                    </div>

                  </div>

                </div>
                :
                <i onClick={() => setIsLoginOpen(!isLoginOpen)} className={item.navIcons[0]}></i>
            }
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
          </div >

        </>
      ))
      }
      <Search isSearchOpen={isSearchOpen} setisSearchOpen={setisSearchOpen} />
    </nav >
  )
}

export default Navbar