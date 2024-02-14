import React from 'react'
import "./index.scss"

function Store() {
    return (
        <section className='store'>
            <div className="store-head">
                <span>Store In The World</span>
                <p>Quisque vitae nibh iaculis neque blandit hendrerit euismod.Maecenas sit amet purus eget ipsum elementum
                    venenatis. Aenean maximus urna magna, quis rutrum mi semper non. Cras rhoncus elit non arcu hendrerit rhoncus sit
                    amet purus eget ipsum.
                </p>
            </div>
            <div className="bike-wrapper">
                <div className="right-bike">
                    <img src="https://topbike-store-demo.myshopify.com/cdn/shop/files/aboutUs_5b8fdb9f-6b5a-4fa7-9779-54ee28c20aed.jpg?v=1613576063" alt="" />
                </div>
                <div className="left-bikes">
                    <div className="img">
                        <img src="https://topbike-store-demo.myshopify.com/cdn/shop/files/aboutUs1.jpg?v=1613576063" alt="" />
                    </div>
                    <div className="img">
                        <img src="https://topbike-store-demo.myshopify.com/cdn/shop/files/aboutUs2.jpg?v=1613576063" alt="" />
                    </div>
                </div>
            </div>
            <div className="store-details">
                <ul>
                    <h3>NEWYORK STORE</h3>
                    <li>Brooklyn Law School. 250 Joralemon</li>
                    <li>Monday to Friday : 9am to 8pm</li>
                    <li>ilkin656.u@gmail.com</li>
                </ul>
                <ul>
                    <h3>AMSTERDAM STORE</h3>
                    <li>Roeterseiland Campus Building E, 10th Amsterdam</li>
                    <li>Monday to Friday : 8am to 5pm</li>
                    <li>ilkin656.u@gmail.com</li>
                </ul>
                <ul>
                    <h3>LONDON STORE</h3>
                    <li>15-17 Charlotte Street, London</li>
                    <li>Monday to Friday : 9am to 8pm</li>
                    <li>Example@gmail.com</li>
                </ul>
            </div>

        </section>
    )
}

export default Store