import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Category from '../../components/Category'
import Header from '../../components/Header'
import LatestNews from '../../components/LatestNews'
import Online from '../../components/Online'
import Modal from '../../components/ProductModal'
import Shipping from '../../components/Shipping'
import NewProduct from '../../components/newProducts'
import Login from '../../components/login'
import Loading from '../Loading'
import { userContext } from '../../context/userContext'

function HomePage({ pageLoading, setPageLoading }) {
  const isModalOpen = useSelector(state => state.basket.isModalOpen)



  useEffect(() => {
    setTimeout(() => {
      setPageLoading(false);
    }, 2000);
    setPageLoading(true)
  }, [])

  return (
    <>
      {
        pageLoading ?
          (
            <Loading />
          )
          :
          <>
            {isModalOpen ? <Modal /> : null}
            <Header />
            <Shipping />
            <NewProduct />
            <Online />
            <Category />
            <LatestNews />
          </>

      }

    </>
  )
}

export default HomePage