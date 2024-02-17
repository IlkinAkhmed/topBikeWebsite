import React, { useEffect, useState } from 'react'
import AboutHeader from '../../components/AboutHeader'
import Store from '../../components/AboutStore'
import Teams from '../../components/AboutTeams'
import Unique from '../../components/AboutUnique'
import "./index.scss"
import Loading from '../Loading'

function About({ pageLoading, setPageLoading }) {
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
            <AboutHeader />
            <Unique />
            <Teams />
            <Store />
          </>

        )
      }

    </>
  )
}

export default About