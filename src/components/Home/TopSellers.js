import React, { useRef, useState } from "react";
import ProductCard from "../ProductCard";
import img1 from "../../assets/images/product.png";
import img2 from "../../assets/images/procuct-1.png";
import img3 from "../../assets/images/product-2.png";
import img4 from "../../assets/images/product-3.png";
import img5 from "../../assets/images/product-4.png";
import { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const TopSellers = () => {
  const [slide, setSlide] = useState({ isEnd: false, isBeginning: false });

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const Products = [
    {
      id: 1,
      title: "2 Liter Pressure Spray Bottle",
      productId: "#12345677",
      img: img1,
    },
    {
      id: 2,
      title: "Easter grass",
      productId: "#12345677",
      img: img2,
    },
    {
      id: 3,
      title: "Native toothpaste",
      productId: "#12345677",
      img: img3,
    },
    {
      id: 4,
      title: "Kumchun sauce",
      productId: "#12345677",
      img: img4,
    },
    {
      id: 5,
      title: "ADVIL LIQUI-GELS",
      productId: "#12345677",
      img: img5,
    },
    {
      id: 6,
      title: "Native toothpaste",
      productId: "#12345677",
      img: img3,
    },
  ];
  return (
    <section className="bg-LIGHTGRAY md:py-5 py-2 w-full">
      <div className="md:space-y-5  space-y-3 relative z-0 container mx-auto xl:px-0 md:px-10 px-3 w-full">
        <h2 className="font-bold md:text-3xl text-xl uppercase text-center ">
          Top sellers
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
          className="py-6"
        >
          {Products.map((product) => (
            <SwiperSlide key={product?.id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
        {!slide.isBeginning && (
          <button
            type="button"
            ref={prevRef}
            className="rounded-full h-10 w-10 p-2 bg-white border border-black absolute top-1/2 -translate-y-1/2 xl:-left-4 md:left-4 left-0 z-10"
          >
            <AiOutlineLeft className="w-6 h-6" />
          </button>
        )}
        {!slide?.isEnd && (
          <button
            type="button"
            ref={nextRef}
            className="rounded-full h-10 w-10 p-2 bg-white border border-black absolute top-1/2 -translate-y-1/2 xl:-right-4 md:right-4 right-0 z-10"
          >
            <AiOutlineRight className="w-6 h-6" />
          </button>
        )}
      </div>
    </section>
  );
};

export default TopSellers;
