import 'aos/dist/aos.css';
import React, { useContext, useEffect } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import useFetchData from '../../hooks/useFetchData';
import './index.scss';
import { userContext } from '../../context/userContext';

function Header() {
  const { product } = useFetchData('header')

  return (
    <Swiper
      navigation={true}
      modules={[Navigation]}
      className="mySwiper"
      loop={true}
      effect={'fade'}>
      {product && product.map(item => (
        <SwiperSlide key={item._id}>
          <div className="bicycle-texts" key={item._id}>
            <img className='bgimg' src={item.bgImg} alt="" />
            <h1 data-aos="fade-left" data-aos-duration="1500">{item.headText}</h1>
            <p data-aos="fade-right" data-aos-duration="1500">{item.description}</p>
            <button data-aos="fade-up" data-aos-duration="1500">{item.buttonText}</button>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Header;
