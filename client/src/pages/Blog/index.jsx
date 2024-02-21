import React, { useContext, useEffect, useState } from 'react'
import Loading from '../Loading'
import { userContext } from '../../context/userContext'
import NotMeanSection from '../../components/notMeanSection'
import BlogsUpSection from '../../components/blogsUpSection'
import BlogsDownSection from '../../components/blogsDownSection'

function Blog({ pageLoading, setPageLoading }) {


  const { fetchBasketData, fetchWishlistData, user,fetchCurrentUser } = useContext(userContext)

  useEffect(() => {
    fetchBasketData()
    fetchWishlistData()
    fetchCurrentUser()
  }, [user])

  useEffect(() => {
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
            {/* <NotMeanSection />p */}
            <BlogsUpSection />
            <BlogsDownSection />
          </>

        )
      }

    </>
  )
}

export default Blog