import React, { useContext, useEffect, useState } from 'react'
import "./index.scss"
import ShopHeader from '../../components/ShopHeader'
import Collection from '../../components/ShowCollection'
import ShopProducts from '../../components/ShopProducts'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '../../components/ProductModal'
import { userContext } from '../../context/userContext'
import Loading from '../Loading'
import { openModal } from '../../reduxSlice/basketSlice'

function Shop({ pageLoading, setPageLoading, OpenCommentBox }) {
  const isModalOpen = useSelector(state => state.basket.isModalOpen)
  const { fetchCurrentUser } = useContext(userContext)
  const dispatch = useDispatch()
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
            {isModalOpen && <div onClick={()=>dispatch(openModal(!isModalOpen))} className="overLay"></div>}
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