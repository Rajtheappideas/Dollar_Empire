import React from "react";
import { Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

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
      className="w-full"
    >
      <SwiperSlide className="relative z-0 w-full">
        <img
          src={require("../../assets/images/hero-section.png")}
          className="w-full h-fit object-contain object-center"
        />
        <img
          src={require("../../assets/images/dollar-empire-logo 1.png")}
          className="top-1/2 -translate-y-1/2 lg:left-[60%] md:left-[55%] left-[60%] absolute lg:h-40 lg:w-40 md:h-fit md:w-fit w-14 h-14 object-fill object-center"
        />
      </SwiperSlide>
      <SwiperSlide className="relative w-full">
        <img
          src={require("../../assets/images/hero-section.png")}
          className="w-full h-fit object-contain object-center"
        />
        <img
          src={require("../../assets/images/dollar-empire-logo 1.png")}
          className="top-1/2 -translate-y-1/2 lg:left-[60%] md:left-[55%] left-[60%] absolute lg:h-40 lg:w-40 md:h-fit md:w-fit w-14 h-14 object-fill object-center"
        />
      </SwiperSlide>
      <SwiperSlide className="relative w-full">
        <img
          src={require("../../assets/images/hero-section.png")}
          className="w-full h-fit object-contain object-center"
        />
        <img
          src={require("../../assets/images/dollar-empire-logo 1.png")}
          className="top-1/2 -translate-y-1/2 lg:left-[60%] md:left-[55%] left-[60%] absolute lg:h-40 lg:w-40 md:h-fit md:w-fit w-14 h-14 object-fill object-center"
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default Herosection;
