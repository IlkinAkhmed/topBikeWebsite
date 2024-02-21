import React from 'react'
import "./index.scss"
import { useNavigate } from 'react-router'

function Online() {
  const navigate = useNavigate()
  return (
    <section className='online'>
      <img className='bgimg' src="https://topbike-store-demo.myshopify.com/cdn/shop/files/countdown-v1.jpg?v=1613575291" alt="" />
      <div className="online-inner">
        <p className='only'>Only Online</p>
        <div className="time-wrapper">
          <div className="time">
            <p>00</p>
            <span>Days</span>
          </div>
          <div className="time">
            <p>00</p>
            <span>Hour</span>
          </div>
          <div className="time">
            <p>00</p>
            <span>Mins</span>
          </div>
          <div className="time">
            <p>00</p>
            <span>Secs</span>
          </div>
        </div>
        <p className='get'>GET 30% OFF YOUR ORDER OF $100 OR MORE</p>
        <p className='use'>USE CODE “TOPBIKE30”</p>
        <button onClick={() => navigate('/shop')}>SHOP NOW</button>
      </div>

    </section>
  )
}

export default Online