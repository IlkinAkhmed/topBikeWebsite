import React, { useContext, useEffect, useState } from 'react'
import ContactHeader from '../../components/ContactHeader'
import Form from '../../components/ContactForm'
import Loading from '../Loading'
import { userContext } from '../../context/userContext'

function Contact({ pageLoading, setPageLoading }) {
  const {fetchCurrentUser,user} = useContext(userContext)
  useEffect(() => {
    fetchCurrentUser()
    setTimeout(() => {
      setPageLoading(false);
    }, 2000);
    setPageLoading(true)
  }, [user])
  return (
    <>
      {pageLoading ? <Loading /> :
        <>
          <ContactHeader />
          <Form />
        </>
      }
    </>
  )
}

export default Contact