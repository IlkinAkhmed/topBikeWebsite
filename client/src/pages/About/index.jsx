import React from 'react'
import AboutHeader from '../../components/AboutHeader'
import Store from '../../components/AboutStore'
import Teams from '../../components/AboutTeams'
import Unique from '../../components/AboutUnique'
import "./index.scss"

function About() {
  return (
    <>
      <AboutHeader />
      <Unique />
      <Teams />
      <Store />
    </>
  )
}

export default About