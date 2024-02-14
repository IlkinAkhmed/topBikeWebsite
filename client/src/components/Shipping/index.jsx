import React, { useEffect, useState } from 'react'
import "./index.scss"
import axios from 'axios'
import AOS from 'aos';
import 'aos/dist/aos.css';
import useFetchData from '../../hooks/useFetchData';

function Shipping() {
    
    const { product } = useFetchData('shipping')

    useEffect(() => {
        AOS.init();
    }, [])
    return (
        <section className='shipping'>
            {product && product.map(item => (
                <div key={item._id} data-aos="fade-up" data-aos-duration="1000" className="shipping-card">
                    <img src={item.img} alt="" />
                    <p>{item.title}</p>
                    <span >{item.description}</span>
                </div>
            ))}

        </section>

    )
}

export default Shipping