import React, { Fragment } from "react";
import { Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { useSelector } from "react-redux";
import BaseUrl from "../../BaseUrl";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useRef } from "react";

const Herosection = () => {
  const swiperRef = useRef(null);

  const { banners, featured, loading } = useSelector(
    (state) => state.getContent
  );

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.screen.width < 540) {
        swiperRef.current.swiper.autoplay.running = false;
      } else {
        swiperRef.current.swiper.autoplay.running = true;
      }
    });
    return () => {
      window.removeEventListener("resize", () => {});
    };
  }, [window.screen.width]);

  return (
    <Fragment>
      {loading ? (
        <div className="overflow-hidden min-h-screen w-auto md:text-3xl text-xl flex justify-center items-center text-center font-semibold mx-auto">
          Loading...
        </div>
      ) : (
        <>
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: true,
              pauseOnMouseEnter: true,
            }}
            speed={1000}
            direction={"horizontal"}
            pagination
            className="w-full"
            ref={swiperRef}
          >
            {banners.map((banner, index) => (
              <SwiperSlide className="relative z-0 w-full" key={index}>
                <Link to={banner?.link}>
                  <img
                    src={BaseUrl.concat(banner?.image)}
                    alt={banner?.imageAlt}
                    className="w-screen md:h-96 h-60 object-fill object-center"
                    loading="lazy"
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="grid place-items-start justify-items-start grid-cols-4 w-full gap-x-1 items-start justify-start">
            {featured.map((img, i) => (
              <Link key={i} to={img?.link} className="w-full">
                <img
                  src={BaseUrl.concat(img.image)}
                  alt={img?.imageAlt}
                  className="md:h-40 h-12 w-full object-fill object-center"
                  loading="lazy"
                />
              </Link>
            ))}
          </div>
        </>
      )}
    </Fragment>
  );
};

export default Herosection;
