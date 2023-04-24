import React, { useRef } from "react";
import {
  AiOutlineClose,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineLeft,
  AiOutlineRight,
} from "react-icons/ai";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { useDispatch } from "react-redux";
import { closePopup } from "../redux/GlobalStates";

const ProductDetailPopup = ({ setShowProductDetailPopup }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const dispatch = useDispatch();

  return (
    <div
      className={`absolute bg-black/30 z-50 w-full md:min-h-[100rem] min-h-[115rem] inset-0 backdrop-blur-sm`}
    >
      <div className="absolute overflow-hidden top-10 left-1/2 -translate-x-1/2 z-30 md:p-5 py-10 px-5 bg-white text-black flex md:flex-row flex-col items-start gap-x-3 xl:w-2/3 lg:w-10/12 w-11/12 h-auto">
        <AiOutlineClose
          role="button"
          onClick={() => dispatch(closePopup())}
          className="absolute md:top-6 top-2 md:left-[94%] left-[90%] w-7 h-7 text-black z-40"
        />
        {/* images */}
        <div className="md:w-5/12 w-full space-y-4 relative z-0">
          <Swiper
            modules={[Navigation]}
            spaceBetween={0}
            slidesPerView={1}
            direction={"horizontal"}
            navigation={{
              prevEl: prevRef?.current,
              nextEl: nextRef?.current,
            }}
            speed={500}
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
            className="border border-gray-400 p-3 relative z-0"
          >
            <SwiperSlide>
              <img
                src={require("../assets/images/product-2.png")}
                alt="prodcut"
                className="h-fit w-full object-contain object-center"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={require("../assets/images/product-2.png")}
                alt="prodcut"
                className="h-fit w-full object-contain object-center"
              />
            </SwiperSlide>
          </Swiper>
          <button
            type="button"
            ref={prevRef}
            className="rounded-full h-8 w-8 p-2 bg-gray-400 absolute top-1/3 -translate-y-1/2 xl:-left-4 -left-3 z-10"
          >
            <AiOutlineLeft className="w-4 h-4 text-white" />
          </button>
          <button
            type="button"
            ref={nextRef}
            className="rounded-full h-8 w-8 p-2 bg-gray-400 absolute top-1/3 -translate-y-1/2 xl:-right-4 -right-3 z-10"
          >
            <AiOutlineRight className="w-4 h-4 text-white" />
          </button>
          <div className="flex items-center gap-4">
            <img
              src={require("../assets/images/product-2.png")}
              alt="prodcut"
              className="h-20 w-20 object-contain object-center border border-gray-400"
            />
            <img
              src={require("../assets/images/product-2.png")}
              alt="prodcut"
              className="h-20 w-20 object-contain object-center border border-gray-400"
            />
          </div>
        </div>
        <hr className="md:hidden block my-3 bg-black w-full" />
        {/* details */}
        <div className="md:w-7/12 w-full space-y-2">
          <p className="text-black font-semibold">#12345677</p>
          <p className="font-bold text-2xl">
            Protective Face Masks with 3 sky Blue, white, pink, color
          </p>
          <p className="font-medium">24 PC/PK, 144 PC/CTN</p>
          <p className="font-medium">PK volume : 0.75 CUFT</p>
          <p className="font-medium">CTN volume : 4.5 CUFT</p>
          <p className="font-medium">PK WT : 2 LBS</p>
          <p className="font-medium">CTN WT : 4.5 LBS</p>
          <p className="text-PRIMARY font-semibold text-lg">
            $0.50/PC | $72.00/CTN
          </p>
          <hr />
          <p className="flex items-center gap-x-4">
            <input
              name="quantity"
              type="radio"
              className="h-5 w-5 inline-block"
            />
            <span>Order By PK*</span>
          </p>
          <div className="flex items-center gap-x-4 ">
            <AiOutlineMinus role="button" className="w-7 h-7" />
            <p className="lg:w-1/3 md:w-1/2 w-10/12 relative">
              <input
                className="w-full p-3 rounded-md border outline-none border-BORDERGRAY text-black"
                placeholder="48 PC"
              />
              <span className="absolute font-semibold top-1/2 -translate-y-1/2 right-2">
                2 PK
              </span>
            </p>
            <AiOutlinePlus role="button" className="w-7 h-7" />
          </div>
          <p className="flex items-center gap-x-4">
            <input
              name="quantity"
              type="radio"
              className="h-5 w-5 inline-block"
            />
            <span>Order By CTN*</span>
          </p>
          <div className="flex w-full items-center gap-x-4 ">
            <AiOutlineMinus role="button" className="w-7 h-7" />
            <p className="lg:w-1/3 md:w-1/2 w-10/12 relative">
              <input
                className="w-full p-3 rounded-md border outline-none border-BORDERGRAY text-black"
                placeholder="144 PC"
              />
              <span className="absolute font-semibold top-1/2 -translate-y-1/2 right-2">
                2 CTN
              </span>
            </p>
            <AiOutlinePlus role="button" className="w-7 h-7" />
          </div>
          <p className="flex items-center gap-x-3">
            <button
              type="button"
              className="bg-DARKRED text-white w-60 p-3 rounded-md"
            >
              Add to cart
              <AiOutlineShoppingCart className="h-6 w-6 ml-2 inline-block" />
            </button>
            <AiOutlineHeart role="button" className="h-8 w-8 text-black" />
          </p>
          <hr />
          <p className="text-2xl font-bold">Discription</p>
          <p className="text-black leading-normal w-11/12">
            Use the KN95 Disposable Mask while running essential errands,
            picking up orders, or while at work to protect yourself and those
            around you. There are 10 With multi-layer filtering, wear this mask
            while practicing social distancing. The KN95 3D mask has adopted the
            KN95 grade anti-particulate filtering technology.
          </p>
          <hr />
          <p className="text-2xl font-bold">Specification</p>
          <p className="flex items-center justify-between w-full">
            <span className="font-normal">PK</span>
            <span className="font-semibold">24</span>
          </p>
          <p className="flex items-center justify-between w-full">
            <span className="font-normal">CTN</span>
            <span className="font-semibold">144</span>
          </p>
          <p className="flex items-center justify-between w-full">
            <span className="font-normal">CTN Dimensions</span>
            <span className="font-semibold">18’’ x 18’’ x 24’’</span>
          </p>
          <p className="flex items-center justify-between w-full">
            <span className="font-normal">PK Volume</span>
            <span className="font-semibold">0.75 CUFT</span>
          </p>
          <p className="flex items-center justify-between w-full">
            <span className="font-normal">CTN Volume</span>
            <span className="font-semibold">4.5 CUFT</span>
          </p>
          <p className="flex items-center justify-between w-full">
            <span className="font-normal">PK Weight</span>
            <span className="font-semibold">2 LBS</span>
          </p>
          <p className="flex items-center justify-between w-full">
            <span className="font-normal">CTN Weight</span>
            <span className="font-semibold">12 LBS</span>
          </p>
          <p className="flex items-center justify-between w-full">
            <span className="font-normal">Category</span>
            <span className="font-semibold">Hardware</span>
          </p>
          <p className="flex items-center justify-between w-full">
            <span className="font-normal">UPC Code</span>
            <span className="font-semibold">6973096824116</span>
          </p>
          <p className="flex items-center justify-between w-full">
            <span className="font-normal">Made by</span>
            <span className="font-semibold">China</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPopup;
