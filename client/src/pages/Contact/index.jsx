import React, { useEffect, useState } from 'react'
import ContactHeader from '../../components/ContactHeader'
import Form from '../../components/ContactForm'
import Loading from '../Loading'

function Contact({ pageLoading, setPageLoading }) {
  useEffect(() => {
    setTimeout(() => {
      setPageLoading(false);
    }, 2000);
    setPageLoading(true)
  }, [])
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