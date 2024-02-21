import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import './blogsDownSection.scss'
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import axios from 'axios'

function BlogsDownSection() {
  const [latest, setLatest] = useState('')

  async function LatestAxios() {
    const res = await axios.get("http://localhost:4001/latestnews")
    setLatest(res.data)
  }

  useEffect(() => {
    LatestAxios()
  }, [])

  return (
    <section id='blogsDownSection'>
      <h1>salam</h1>
      <Swiper
        slidesPerView={2}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          538: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {
          latest && latest.map((item) => (
            <SwiperSlide>

              <div className="latestBox">
                <div className="latestImgBox">
                  <img src={item.image} alt="" />
                  <div className="imgHoverBox">
                    <p>{item.time}</p>
                    <div className="latestLine"></div>
                    <p>{item.date}</p>
                  </div>
                </div>
                <div className="latestTextBox">
                  <p style={{ color: "gray", fontSize: "18px", cursor: "pointer" }}>News</p>
                  <p style={{ fontSize: "23px", cursor: "pointer" }}>{item.name}</p>
                  <span style={{ color: "gray" }}>{item.comment}</span>
                  <button><p>Readmore</p></button>
                </div>
              </div>
            </SwiperSlide>

          ))
        }
      </Swiper>
    </section>
  )
}

export default BlogsDownSection