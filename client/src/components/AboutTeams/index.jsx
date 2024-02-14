import React from 'react'
import "./index.scss"

function Teams() {
    return (
        <section className='teams'>
            <div className="teams-head">
                <span>Meet Our Teams</span>
                <p>Donec sed odio dui. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh,ut fermentum massa justo. condimentum nibh.</p>
            </div>
            <div className="teams-wrapper">
                <div className="person-card">
                    <div className="img">
                        <img src="https://topbike-store-demo.myshopify.com/cdn/shop/files/agent1.jpg?v=1613576059" alt="" />
                    </div>
                    <div className="person-texts">
                        <h3>KAREN RYAN</h3>
                        <p>Project Manager</p>
                    </div>
                </div>
                <div className="person-card">
                    <div className="img">
                        <img src="https://topbike-store-demo.myshopify.com/cdn/shop/files/agent2.jpg?v=1613576059" alt="" />
                    </div>
                    <div className="person-texts">
                        <h3>KAREN RYAN</h3>
                        <p>Sale Agent</p>
                    </div>
                </div>
                <div className="person-card">
                    <div className="img">
                        <img src="https://topbike-store-demo.myshopify.com/cdn/shop/files/agent3.jpg?v=1613576059" alt="" />
                    </div>
                    <div className="person-texts">
                        <h3>KAREN RYAN</h3>
                        <p>Photographer</p>
                    </div>
                </div>
                <div className="person-card">
                    <div className="img">
                        <img src="https://topbike-store-demo.myshopify.com/cdn/shop/files/agent4.jpg?v=1613576059" alt="" />
                    </div>
                    <div className="person-texts">
                        <h3>KAREN RYAN</h3>
                        <p>Designer</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Teams