import React from 'react'
import './index.scss'

function Online() {
  return (
    <section id='onlyOnlineSection'>
      <div className="onlineBox">
        <div className="onlyTextBox">
          <h3>Only Online</h3>
        </div>
        <div className="timerBox">
          <div className="time">
            <p>00</p>
            <span>Days</span>
          </div>
          <div className="time">
            <p>00</p>
            <span>Hours</span>
          </div>
          <div className="time">
            <p>00</p>
            <span>Mins</span>
          </div>
          <div className="time">
            <p>00</p>
            <span>Sec</span>
          </div>
        </div>
        <div className="onlyTextsBox">
          <p>GET 30% OFF YOUR ORDER OF $100 OR MORE</p>
          <span>USE CODE “TOPBIKE30”</span>
        </div>
        <div className="onlyShopBtn">
          <button>
            <p>Shop Now</p>
          </button>
        </div>
      </div>
    </section>
  )
}

export default Online