import React from 'react'
import Footer from './Footer'
import { Outlet } from "react-router-dom"
import Navbar from './Navbar'
import Basket from '../components/Basket'

function MainLayout({ isLoginOpen, setIsLoginOpen }) {
    return (
        <>
            <Navbar isLoginOpen={isLoginOpen} setIsLoginOpen={setIsLoginOpen} />
            <Basket />
            <Outlet />
            <Footer />
        </>
    )
}

export default MainLayout