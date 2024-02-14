import React from 'react'
import "./index.scss"
import { Link } from 'react-router-dom'
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import useFetchData from '../../hooks/useFetchData';

function LatestNews() {
    const { product } = useFetchData('latestNews')
    return (
        <section className='latest-news'>
            <h1>LATEST NEWS</h1>
            <Swiper
                className="news-wrapper"
                spaceBetween={50}
                slidesPerView={2}
                // navigation={true}
                modules={[Navigation]}
                loop={true}
            >
                {product && product.map(item => (
                    <SwiperSlide className="news-card" key={item._id}>
                        <div className="news-img">
                            <div className="dec">
                                <p>08</p>
                                <hr />
                                <p>DEC</p>
                            </div>
                            <img src={item.bgImg} alt="" />
                        </div>
                        <div className="news-texts">
                            <p>{item.news}</p>
                            <Link className='news-link'>{item.title}</Link>
                            <p>{item.description}</p>
                            <Link className='news-link2'>{item.read}</Link>
                        </div>
                    </SwiperSlide>

                ))}
            </Swiper>
        </section>
    )
}

export default LatestNews