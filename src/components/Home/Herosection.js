import React from "react";
import { Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const Herosection = () => {
  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      speed={1000}
      direction={"horizontal"}
      pagination
    >
      <SwiperSlide className="relative">
        <img
          src={require("../../assets/images/hero-section.png")}
          className="w-fit h-fit object-contain object-center"
        />
        <img
          src={require("../../assets/images/dollar-empire-logo 1.png")}
          className="top-1/2 -translate-y-1/2 left-1/2 h-fit w-fit object-contain object-center"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src={require("../../assets/images/hero-section.png")}
          className="w-fit h-fit object-contain object-center"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src={require("../../assets/images/hero-section.png")}
          className="w-fit h-fit object-contain object-center"
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default Herosection;
