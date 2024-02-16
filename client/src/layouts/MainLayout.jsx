import React, { useEffect, useState } from 'react'
import Footer from './Footer'
import { Outlet } from "react-router-dom"
import Navbar from './Navbar'
import Basket from '../components/Basket'

function MainLayout({ loading, setLoading }) {

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, [])
    return (
        <>
            {!loading && <Navbar />}
            <Basket />
            <Outlet />
            {!loading && <Footer />}

        </>
    )
}

export default MainLayout