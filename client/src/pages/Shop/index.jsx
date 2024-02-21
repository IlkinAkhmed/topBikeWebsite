import React, { useContext, useEffect, useState } from 'react'
import "./index.scss"
import ShopHeader from '../../components/ShopHeader'
import Collection from '../../components/ShowCollection'
import ShopProducts from '../../components/ShopProducts'
import { useSelector } from 'react-redux'
import Modal from '../../components/ProductModal'
import { userContext } from '../../context/userContext'
import Loading from '../Loading'

function Shop({ pageLoading, setPageLoading,OpenCommentBox }) {
  const isModalOpen = useSelector(state => state.basket.isModalOpen)
  const {fetchCurrentUser} = useContext(userContext)
  useEffect(() => {
    fetchCurrentUser()
    setTimeout(() => {
      setPageLoading(false);
    }, 2000);
    setPageLoading(true)
  }, [])
  return (

    <>
      {pageLoading ? <Loading /> :
        (
          <>
            {isModalOpen ? <Modal /> : null}
            <ShopHeader />
            <Collection />
            <ShopProducts OpenCommentBox={OpenCommentBox} />
          </>

        )
      }
    </>
  )
}

export default Shop