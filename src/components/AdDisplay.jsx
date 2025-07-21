import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "../App.css";

const AdDisplay = ({ src }) => {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      loop={true}
      className="ad-carousel"
    >
      {src.map((image, index) => (
        <SwiperSlide key={index}>
          <img className="ad-media" src={image} alt={`Ad ${index + 1}`} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default AdDisplay;
