import React from 'react'
import Footer from './Footer'
import { Outlet } from "react-router-dom"
import Navbar from './Navbar'
import Basket from '../components/Basket'

function MainLayout() {
    return (
        <>
            <Navbar  />
            <Basket />
            <Outlet />
            <Footer />
        </>
    )
}

export default MainLayout