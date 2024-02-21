import React from 'react'
import "./index.scss"
import { NavLink, useNavigate } from 'react-router-dom'

function AdminNavbar() {
    return (
        <div className='adminNavbar'>
            <div className="adminLogo">
                <img src="https://topbike-store-demo.myshopify.com/cdn/shop/files/Untitled-2.png?v=1613575289" alt="" />
            </div>
        <div className="adminNavbarInner">
                <NavLink className={'adminNavLink'} to={'/admin'} >Dashboard</NavLink>
                <NavLink className={'adminNavLink'} to={'/dashboard/products'} >Products</NavLink>
                <NavLink className={'adminNavLink'} to={'/dashboard/users'} >Users</NavLink>

            </div>
        </div>
    )
}

export default AdminNavbar