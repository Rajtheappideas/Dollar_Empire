import React, { Fragment, useRef, useState } from "react";
import ProductCard from "../ProductCard";
import { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import {
  handleAddProductToFavourites,
  handleRemoveProductToFavourites,
} from "../../redux/FeatureSlice";
import { handleGetNewArrivals } from "../../redux/GetContentSlice";
import {
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillHeart,
} from "react-icons/ai";
import BaseUrl from "../../BaseUrl";
import { handleSetSingelProductId, showPopup } from "../../redux/GlobalStates";
import { Link } from "react-router-dom";

const TopSellers = ({}) => {
  const [loading, setLoading] = useState(false);
  const [slide, setSlide] = useState({ isEnd: false, isBeginning: false });

  const { topSellers } = useSelector((state) => state.getContent);
  const { t } = useTranslation();

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const { user, token } = useSelector((state) => state.Auth);

  const AbortControllerRef = useRef(null);

  const dispatch = useDispatch();

  const handleAddtoFavourties = (id) => {
    setLoading(true);
    const response = dispatch(
      handleAddProductToFavourites({ token, id, signal: AbortControllerRef })
    );
    if (response) {
      response
        .then((res) => {
          if (res.payload.status === "success") {
            dispatch(handleGetNewArrivals({ token }));
            toast.success(res.payload.message);
          } else if (res.payload.status === "fail") {
            toast.error(res.payload.message);
          }
          setLoading(false);
        })
        .catch((err) => {
          toast.error(err.payload.message);
          setLoading(false);
        });
    }
  };

  const handleRemoveFromFavourties = (id) => {
    setLoading(true);
    const response = dispatch(
      handleRemoveProductToFavourites({ token, id, signal: AbortControllerRef })
    );
    if (response) {
      response
        .then((res) => {
          dispatch(handleGetNewArrivals({ token }));
          toast.success(res.payload.message);
          setLoading(false);
        })
        .catch((err) => {
          toast.error(err.payload.message);
          setLoading(false);
        });
    }
  };
  return (
    <section className="bg-LIGHTGRAY md:py-5 py-2 w-full">
      <div className="md:space-y-5  space-y-3 relative z-0 container mx-auto xl:px-0 md:px-10 px-3 w-full">
        <h2 className="font-bold md:text-3xl text-xl uppercase text-center ">
          {t("top_sellers")}
        </h2>
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
            disableOnInteraction: true,
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
          {loading ? (
            <p className="text-center md:text-3xl text-xl text-black p-3">
              Loading...
            </p>
          ) : (
            topSellers.map((product) => (
              <SwiperSlide key={product?._id}>
                <ProductCard product={product} from="TopSellers" />
              </SwiperSlide>
            ))
          )}
        </Swiper>
        {!slide.isBeginning && (
          <button
            type="button"
            ref={prevRef}
            className="rounded-full md:p-2 p-0.5 bg-white border border-black absolute top-1/2 -translate-y-1/2 xl:-left-4 md:left-4 left-0 z-10"
          >
            <AiOutlineLeft className="w-6 h-6" />
          </button>
        )}
        {!slide?.isEnd && (
          <button
            type="button"
            ref={nextRef}
            className="rounded-full md:p-2 p-0.5 bg-white border border-black absolute top-1/2 -translate-y-1/2 xl:-right-4 md:right-4 right-0 z-10"
          >
            <AiOutlineRight className="w-6 h-6" />
          </button>
        )}
      </div>
    </section>
  );
};

export default TopSellers;
