import React, { useContext } from 'react'
import "./index.scss"
import ShopHeader from '../../components/ShopHeader'
import Collection from '../../components/ShowCollection'
import ShopProducts from '../../components/ShopProducts'
import { useSelector } from 'react-redux'
import Modal from '../../components/ProductModal'
import { userContext } from '../../context/userContext'

function Shop() {
  const isModalOpen = useSelector(state => state.basket.isModalOpen)
  return (
    <>
      {/* {isModalOpen ? <Modal /> : null} */}
      <ShopHeader />
      <Collection />
      <ShopProducts />
    </>
  )
}

export default Shop