import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Category from '../../components/Category'
import Header from '../../components/Header'
import LatestNews from '../../components/LatestNews'
import Online from '../../components/Online'
import Modal from '../../components/ProductModal'
import Shipping from '../../components/Shipping'
import NewProduct from '../../components/newProducts'
import Login from '../../components/login'

function HomePage() {
  const isModalOpen = useSelector(state => state.basket.isModalOpen)
  return (
    <>
      {/* {isModalOpen ? <Modal /> : null} */}
      <Header />
      <Shipping />
      <NewProduct />
      <Online />
      <Category />
      <LatestNews />

    </>
  )
}

export default HomePage