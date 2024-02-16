import React, { useEffect, useState } from 'react'
import AboutHeader from '../../components/AboutHeader'
import Store from '../../components/AboutStore'
import Teams from '../../components/AboutTeams'
import Unique from '../../components/AboutUnique'
import "./index.scss"
import Loading from '../Loading'

function About({ loading, setLoading }) {
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    setLoading(true)
  }, [])
  return (
    <>
      {loading ? <Loading /> :
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