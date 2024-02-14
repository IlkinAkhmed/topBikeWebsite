import React from 'react'
import "./index.scss"
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="logoSide">
          <img src="https://topbike-store-demo.myshopify.com/cdn/shop/files/LOGO.png?v=1613575279" alt="" />
          <p>The simple, delicate and light design makes it comfortable for everyone.</p>
          <div className="icons">
            <i className='fa-brands fa-twitter'></i>
            <i className='fa-solid fa-basketball'></i>
            <i className="fa-brands fa-behance"></i>
            <i className='fa-brands fa-instagram'></i>
          </div>
        </div>
        <ul>
          <h2>Shop</h2>
          <hr />
          <Link className="footer-link" to={'/shop'}>Shopping</Link>
          <Link className="footer-link" to={'/shop'}>Bicycle</Link>
          <Link className="footer-link" to={'/shop'}>Bicycle Accessories</Link>
          <Link className="footer-link" to={'/shop'}>Helmets</Link>
        </ul>
        <ul>
          <h2>Aboout Us</h2>
          <hr />
          <Link className="footer-link" to={'/about'}>About Us</Link>
          <Link className="footer-link" to={'/'}>Pagination</Link>
          <Link className="footer-link" to={'/'}>Terms & Conditions</Link>
          <Link className="footer-link" to={'/contact'}>Contact</Link>
          <Link className="footer-link" to={'/shop'}>Accessories</Link>
          <Link className="footer-link" to={'/'}>Term of use</Link>
        </ul>
        <ul>
          <h2>Information</h2>
          <hr />
          <Link className="footer-link" to={'/'}>Address</Link>
          <Link className="footer-link" to={'/'}>Privacy PoLinkcy</Link>
          <Link className="footer-link" to={'/'}>Terms & Conditions</Link>
          <Link className="footer-link" to={'/'}>Products Return</Link>
          <Link className="footer-link" to={'/'}>Wholesale Policy</Link>
        </ul>
      </div>
    </footer>
  )
}

export default Footer