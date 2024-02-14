import React from 'react'
import "./index.scss"
import ShopHeader from '../../components/ShopHeader'
import Collection from '../../components/ShowCollection'
import ShopProducts from '../../components/ShopProducts'
import { useSelector } from 'react-redux'
import Modal from '../../components/ProductModal'

function Shop({ isLoginOpen, setIsLoginOpen }) {
  const isModalOpen = useSelector(state => state.basket.isModalOpen)
  return (
    <>
      {/* {isModalOpen ? <Modal /> : null} */}
      <ShopHeader />
      <Collection />
      <ShopProducts isLoginOpen={isLoginOpen} setIsLoginOpen={setIsLoginOpen} />
    </>
  )
}

export default Shop