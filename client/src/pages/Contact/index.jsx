import React, { useEffect, useState } from 'react'
import ContactHeader from '../../components/ContactHeader'
import Form from '../../components/ContactForm'
import Loading from '../Loading'

function Contact({ loading, setLoading }) {
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    setLoading(true)
  }, [])
  return (
    <>
      {loading ? <Loading /> :
        <>
          <ContactHeader />
          <Form />
        </>
      }
    </>
  )
}

export default Contact