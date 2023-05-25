import React, { Fragment, useRef, useState } from "react";
import ProductCard from "../ProductCard";
import { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const NewArrivals = ({}) => {
  const [slide, setSlide] = useState({ isEnd: false, isBeginning: false });

  const { newArrivals, productLoading } = useSelector(
    (state) => state.products
  );
  const { t } = useTranslation();

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (
    <section
      id="New-Arrivals"
      className="md:space-y-5 space-y-3 relative z-20 container mx-auto xl:px-0 md:px-10 px-3 w-full"
    >
      <h2 className="font-bold md:text-3xl text-xl uppercase text-center ">
        {t("new_arrivals")}
      </h2>
      {newArrivals !== undefined &&
      newArrivals.length === 0 &&
      !productLoading ? (
        <p className="md:text-2xl text-lg mx-auto w-full text-center font-semibold">
          Prodcuts Not Found, Try again sometimes.
        </p>
      ) : (
        <>
          <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={10}
            slidesPerView={5}
            direction={"horizontal"}
            navigation={{
              prevEl: prevRef?.current,
              nextEl: nextRef?.current,
            }}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={500}
            onSlideChange={(e) => {
              setSlide({ isEnd: e.isEnd, isBeginning: e.isBeginning });
            }}
            onSwiper={(swiper) => {
              // Delay execution for the refs to be defined
              setTimeout(() => {
                // Override prevEl & nextEl now that refs are defined
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;

                // Re-init navigation
                swiper.navigation.destroy();
                swiper.navigation.init();
                swiper.navigation.update();
              });
            }}
            breakpoints={{
              1280: {
                slidesPerView: 5,
              },
              1024: {
                slidesPerView: 3,
              },
              640: {
                slidesPerView: 2,
              },
              240: {
                slidesPerView: 1,
              },
            }}
            className="py-8"
          >
            {productLoading ? (
              <>
                <SwiperSlide>
                  <Skeleton
                    borderRadius="10px"
                    duration={0.5}
                    baseColor="lightgray"
                    highlightColor="white"
                    className="md:h-80 h-60 "
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <Skeleton
                    borderRadius="10px"
                    duration={0.5}
                    baseColor="lightgray"
                    highlightColor="white"
                    className="md:h-80 h-60 "
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <Skeleton
                    borderRadius="10px"
                    duration={0.5}
                    baseColor="lightgray"
                    highlightColor="white"
                    className="md:h-80 h-60 "
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <Skeleton
                    borderRadius="10px"
                    duration={0.5}
                    baseColor="lightgray"
                    highlightColor="white"
                    className="md:h-80 h-60 "
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <Skeleton
                    borderRadius="10px"
                    duration={0.5}
                    baseColor="lightgray"
                    highlightColor="white"
                    className="md:h-80 h-60 "
                  />
                </SwiperSlide>
              </>
            ) : (
              newArrivals.map((product) => (
                <SwiperSlide key={product?._id}>
                  <ProductCard product={product} from="NewArrivals" />
                </SwiperSlide>
              ))
            )}
          </Swiper>
          {!slide.isBeginning && (
            <button
              type="button"
              ref={prevRef}
              className="rounded-full md:p-2 p-0.5 bg-white border border-black absolute top-1/2 -translate-y-1/2 xl:-left-4 md:left-4 left-0 z-20"
            >
              <AiOutlineLeft className="w-6 h-6" />
            </button>
          )}
          {!slide?.isEnd && (
            <button
              type="button"
              ref={nextRef}
              className="rounded-full md:p-2 p-0.5 bg-white border border-black absolute top-1/2 -translate-y-1/2 xl:-right-4 md:right-4 right-0 z-20"
            >
              <AiOutlineRight className="w-6 h-6" />
            </button>
          )}
        </>
      )}
    </section>
  );
};

export default NewArrivals;
