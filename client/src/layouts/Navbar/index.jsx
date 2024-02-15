import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"
import "./index.scss"
import { NavLink, useNavigate } from 'react-router-dom'
import useFetchData from '../../hooks/useFetchData'
import { useDispatch, useSelector } from 'react-redux'
import { openBasket } from '../../reduxSlice/basketSlice'
import Search from '../../components/Search'
import { userContext } from '../../context/userContext'
import toast from 'react-hot-toast'

function Navbar() {
  const { user, setUser, basketArr,isLoginOpen,setIsLoginOpen } = useContext(userContext);

  const basketOpen = useSelector((state) => state.basket.isOpen)
  const wishlistArr = useSelector((state) => state.wishlist.value)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { product } = useFetchData('navbar')


  const [isSearchOpen, setisSearchOpen] = useState(false)
  const [scroll, setScroll] = useState(false);



  function handleScroll() {
    if (window.scrollY > 120) {
      setScroll(true)
    } else {
      setScroll(false)
    }
  }


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
                <img onClick={() => { setUser(null), toast.success('Log Outed') }} style={{ width: "30px", height: "30px", borderRadius: "50%" }} src={`${user.profileImg ? user.profileImg : "https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg"}`} alt="" />
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
          </div>

        </>
      ))}
      <Search isSearchOpen={isSearchOpen} setisSearchOpen={setisSearchOpen} />
    </nav>
  )
}

export default Navbar