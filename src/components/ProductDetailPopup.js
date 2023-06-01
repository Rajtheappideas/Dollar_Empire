import React, { useEffect, useRef, useState } from "react";
import {
  AiOutlineClose,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineLeft,
  AiOutlineRight,
  AiFillHeart,
} from "react-icons/ai";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { useDispatch, useSelector } from "react-redux";
import { closePopup, showPopup } from "../redux/GlobalStates";
import { Link } from "react-router-dom";
import {
  handleGetNewArrivals,
  handleGetProductById,
} from "../redux/ProductSlice";
import BaseUrl from "../BaseUrl";
import {
  handleAddProductToFavourites,
  handleRemoveProductToFavourites,
} from "../redux/FavouriteSlice";
import { toast } from "react-hot-toast";
import {
  handleAddProductToCart,
  handleUpdateTotalQuantityAndAmount,
} from "../redux/CartSlice";
import { useTranslation } from "react-i18next";

const ProductDetailPopup = ({}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState();
  const [selectedItemType, setSelectedItemType] = useState("pk");
  const [pkitemsQuantity, setpkItemsQuantity] = useState("");
  const [ctnItemQuantity, setCtnItemQuantity] = useState("");
  const [favouriteLoading, setFavouriteLoading] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [findInCart, setFindInCart] = useState(null);
  const [addProductToCartLoading, setAddProductToCartLoading] = useState(false);
  const [pkCount, setPkCount] = useState(0);
  const [ctnCount, setCtnCount] = useState(0);
  const [isFavourite, setIsFavourite] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const { user, token } = useSelector((state) => state.Auth);
  const { singleProductId } = useSelector((state) => state.globalStates);
  const { singleProduct, singleProductLoading } = useSelector(
    (state) => state.products
  );
  const { quantity, orderType, cart, cartItems } = useSelector(
    (state) => state.cart
  );

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const AbortControllerRef = useRef(null);

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const handleAddtoFavourties = (id) => {
    setFavouriteLoading(true);
    const response = dispatch(
      handleAddProductToFavourites({ token, id, signal: AbortControllerRef })
    );
    if (response) {
      response
        .then((res) => {
          setIsFavourite(!isFavourite);
          toast.success(res.payload.message);
          setFavouriteLoading(false);
        })
        .catch((err) => {
          toast.error(err.payload.message);
          setFavouriteLoading(false);
        });
    }
  };

  const handleRemoveFromFavourties = (id) => {
    setFavouriteLoading(true);
    const response = dispatch(
      handleRemoveProductToFavourites({ token, id, signal: AbortControllerRef })
    );
    if (response) {
      response
        .then((res) => {
          setIsFavourite(!isFavourite);
          toast.success(res.payload.message);
          setFavouriteLoading(false);
        })
        .catch((err) => {
          toast.error(err.payload.message);
          setFavouriteLoading(false);
        });
    }
  };

  const handleAddProduct = (id, title, quantity, amount) => {
    toast.dismiss();
    if (pkitemsQuantity === "" && ctnItemQuantity === "") {
      return toast.error("Please add some quantity!!!");
    } else if (selectedItemType === "pk" && ctnItemQuantity > 0) {
      toast.error("Please enter quantity in PK, you choose PK");
      setCtnItemQuantity("");
      return true;
    } else if (selectedItemType === "ctn" && pkitemsQuantity > 0) {
      toast.error("Please enter quantity in CTN, you choose CTN");
      setpkItemsQuantity("");
      return true;
    } else if (
      !/^\d+$/.test(pkitemsQuantity !== "" ? pkitemsQuantity : ctnItemQuantity)
    ) {
      setCtnItemQuantity("");
      setpkItemsQuantity("");
      return toast.error("Please enter valid value!!!");
    }
    setAddProductToCartLoading(true);
    const response = dispatch(
      handleAddProductToCart({
        token,
        id,
        signal: AbortControllerRef,
        type: selectedItemType,
        quantity: selectedItemType === "pk" ? pkitemsQuantity : ctnItemQuantity,
      })
    );
    if (response) {
      response
        .then((res) => {
          if (res.payload.status === "success") {
            toast.success(`${title} added to cart successfully.`);
            dispatch(handleUpdateTotalQuantityAndAmount({ quantity, amount }));
            setCtnItemQuantity("");
            setpkItemsQuantity("");
            setSelectedItemType("pk");
            setSelectedProductId(null);
            setAddProductToCartLoading(false);
            // dispatch(handleGetNewArrivals({ token }));
            // dispatch(handleGetTopSellers({ token }));
            // dispatch(handleGetAllProducts({ token }));
          }
        })
        .catch((err) => {
          toast.error(err.payload.message);
          setAddProductToCartLoading(false);
        });
    }
  };

  const handlePlusPkQuantity = (quantity, count) => {
    if (
      selectedItemType === "pk" &&
      findInCart?.product?._id !== singleProduct?._id
    ) {
      setPkCount(count);
      setpkItemsQuantity(quantity * count);
    }
  };

  const handleMinusPkQuantity = (quantity, count) => {
    if (
      selectedItemType === "pk" &&
      findInCart?.product?._id !== singleProduct?._id
    ) {
      if (pkCount === 0) {
        setPkCount(0);
      } else {
        setPkCount(count);
        setpkItemsQuantity(quantity * count);
      }
    }
  };

  const handlePlusCTNQuantity = (quantity, count) => {
    if (
      selectedItemType === "ctn" &&
      findInCart?.product?._id !== singleProduct?._id
    ) {
      setCtnCount(count);
      setCtnItemQuantity(quantity * count);
    }
  };

  const handleMinusCTNQuantity = (quantity, count) => {
    if (
      selectedItemType === "ctn" &&
      findInCart?.product?._id !== singleProduct?._id
    ) {
      if (ctnCount === 0) {
        setCtnCount(0);
      } else {
        setCtnCount(count);
        setCtnItemQuantity(quantity * count);
      }
    }
  };

  const handleChangePkCount = (e) => {
    if (pkCount < 0) {
      setPkCount(0);
    } else {
      setPkCount(e.target.value);
      setpkItemsQuantity(singleProduct?.PK * e.target.value);
    }
  };

  useEffect(() => {
    dispatch(handleGetProductById({ id: singleProductId, token }));
    return () => {
      AbortControllerRef.current !== null && AbortControllerRef.current.abort();
    };
  }, []);

  useEffect(() => {
    setIsFavourite(singleProduct?.isFavourite);
  }, [singleProductLoading]);

  useEffect(() => {
    if (cart !== null && cartItems.length > 0) {
      const findItemInCart = cartItems.find(
        (i) => i.product?._id === singleProduct?._id
      );
      setFindInCart(findItemInCart);
    }
  }, [pkitemsQuantity, ctnItemQuantity, singleProductLoading]);
  return (
    <div
      className={`absolute bg-black/30 z-40 w-full md:min-h-[100rem] min-h-[115rem] inset-0 backdrop-blur-sm`}
    >
      {singleProductLoading ? (
        <div className="absolute text-center font-semibold md:text-3xl text-xl overflow-hidden top-10 left-1/2 -translate-x-1/2 z-30 bg-white text-black flex items-center justify-center  xl:w-2/3 lg:w-10/12 w-11/12 min-h-screen">
          <AiOutlineClose
            role="button"
            onClick={() => dispatch(closePopup())}
            className="absolute md:top-6 top-2 md:left-[94%] left-[90%] w-7 h-7 text-black z-40"
          />
          Loading...
        </div>
      ) : (
        <div className="absolute overflow-hidden top-10 left-1/2 -translate-x-1/2 z-30 md:p-5 py-10 px-5 bg-white text-black flex md:flex-row flex-col items-start gap-x-3 xl:w-2/3 lg:w-10/12 w-11/12 h-auto">
          <AiOutlineClose
            role="button"
            onClick={() => dispatch(closePopup())}
            className="absolute md:top-6 top-2 md:left-[94%] left-[90%] w-7 h-7 text-black z-40"
          />
          {/* images */}
          <div className="md:w-5/12 w-full">
            <div className="w-full space-y-4 relative z-0">
              <Swiper
                modules={[Navigation, FreeMode, Thumbs]}
                spaceBetween={0}
                slidesPerView={1}
                direction={"horizontal"}
                grabCursor={true}
                navigation={{
                  prevEl: prevRef?.current,
                  nextEl: nextRef?.current,
                }}
                freeMode={true}
                centeredSlides={true}
                thumbs={{ swiper: thumbsSwiper }}
                speed={500}
                onSwiper={(swiper) => {
                  // Delay execution for the refs to be defined
                  setTimeout(() => {
                    // Override prevEl & nextEl now that refs are defined
                    if (swiper.params) {
                      swiper.params.navigation.prevEl = prevRef.current;
                      swiper.params.navigation.nextEl = nextRef.current;

                      // Re-init navigation
                      swiper.navigation.destroy();
                      swiper.navigation.init();
                      swiper.navigation.update();
                    }
                  });
                }}
                className="border border-gray-400 p-3 relative z-0"
              >
                {singleProductLoading ? (
                  <p>Loading...</p>
                ) : (
                  singleProduct?.images.map((image, i) => (
                    <SwiperSlide key={i}>
                      <img
                        src={BaseUrl.concat(image)}
                        alt={singleProduct?.title}
                        className="h-fit w-full object-contain object-center"
                        loading="lazy"
                      />
                    </SwiperSlide>
                  ))
                )}
              </Swiper>
              {/* prev btn */}
              <button
                type="button"
                ref={prevRef}
                className="rounded-full h-8 w-8 p-2 bg-gray-400 absolute top-1/3 -translate-y-1/2 xl:-left-4 -left-3 z-10"
              >
                <AiOutlineLeft className="w-4 h-4 text-white" />
              </button>
              {/* next btn */}
              <button
                type="button"
                ref={nextRef}
                className="rounded-full h-8 w-8 p-2 bg-gray-400 absolute top-1/3 -translate-y-1/2 xl:-right-4 -right-3 z-10"
              >
                <AiOutlineRight className="w-4 h-4 text-white" />
              </button>
            </div>
            {/* <Swiper
              onSwiper={(swiper) => {
                // swiper.activeIndex
                if (swiper && swiper.thumbs) {
                  setThumbsSwiper(swiper);
                  console.log(swiper);
                }
              }}
              loop={true}
              spaceBetween={10}
              slidesPerView={4}
              modules={[Navigation, Thumbs]}
            >
              {singleProductLoading ? (
                <p>Loading...</p>
              ) : (
                singleProduct?.images.map((image, i) => (
                  <SwiperSlide key={i}>
                    <img
                      src={BaseUrl.concat(image)}
                      alt={singleProduct?.title}
                      className="h-20 w-20 object-contain object-center"
                      loading="lazy"
                    />
                  </SwiperSlide>
                ))
              )}
            </Swiper> */}
            {/* <div className="flex items-center gap-x-2 pt-5">
              {singleProduct?.images.map((image, index) => (
                <img
                  key={index}
                  src={BaseUrl.concat(image)}
                  className="h-20 w-20 border-2 border-PRIMARY p-2 rounded-lg cursor-pointer"
                  onClick={() => {
                    // handleChangeActiveSlide(index);
                    setActiveSlide(index);
                  }}
                />
              ))}
            </div> */}
          </div>
          <hr className="md:hidden block my-3 bg-black w-full" />
          {/* details */}
          {user === null ? (
            <div className="md:w-7/12 w-full space-y-2">
              <p className="text-black font-semibold">
                {singleProduct?.number}
              </p>

              <p className="font-bold text-2xl">{singleProduct?.name}</p>
              <p className="font-medium text-lg">{singleProduct?.longDesc}</p>
              <p className="flex items-center gap-x-3">
                <Link to="/sign-in">
                  <button
                    type="button"
                    className="bg-DARKRED text-white w-60 p-3 rounded-md hover:text-DARKRED hover:bg-white border border-DARKRED duration-300 ease-linear"
                    onClick={() => {
                      dispatch(closePopup());
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    Login to order
                  </button>
                </Link>
              </p>
            </div>
          ) : (
            <div className="md:w-7/12 w-full space-y-2">
              {/* <p className="text-black font-semibold">#12345677</p> */}
              <p className="font-bold text-2xl">{singleProduct?.name}</p>
              <p className="font-medium text-lg">{singleProduct?.longDesc}</p>
              <p className="font-medium"> {singleProduct?.package}</p>
              <p className="font-medium">
                PK volume : {singleProduct?.PKVolume} CUFT
              </p>
              <p className="font-medium">
                CTN volume : {singleProduct?.CTNVolume} CUFT
              </p>
              <p className="font-medium">
                PK WT : {singleProduct?.PKWeight} LBS
              </p>
              <p className="font-medium">
                CTN WT : {singleProduct?.CTNWeight} LBS
              </p>
              <p className="text-PRIMARY font-semibold text-lg pb-3">
                ${singleProduct?.price}/PC | $
                {(singleProduct?.price * singleProduct?.PK).toFixed(1)}/PK | $
                {(singleProduct?.price * singleProduct?.CTN).toFixed(1)}/CTN
              </p>
              <hr className="pt-3" />
              <p className="flex items-center gap-x-4">
                <input
                  name="quantity"
                  type="radio"
                  className="h-5 w-5 inline-block"
                  defaultChecked={true}
                  onChange={(e) => setSelectedItemType(e.target.value)}
                  value="pk"
                  disabled={addProductToCartLoading}
                />
                <span>Order By PK*</span>
              </p>
              <div className="flex items-center gap-x-4 ">
                <button
                  type="button"
                  className={`${
                    selectedItemType === "ctn" && "cursor-not-allowed"
                  }`}
                  disabled={addProductToCartLoading}
                >
                  <AiOutlineMinus
                    onClick={() =>
                      !addProductToCartLoading &&
                      handleMinusPkQuantity(
                        parseFloat(singleProduct?.PK),
                        parseFloat(pkCount - 1)
                      )
                    }
                    className="w-7 h-7"
                  />
                </button>
                <div className="w-auto min-w-[10rem] flex items-center justify-between rounded-md border p-3 pr-12 h-12 outline-none border-BORDERGRAY text-black">
                  <input
                    className={`w-1/2 outline-none text-black ${
                      selectedItemType === "ctn" && "cursor-not-allowed"
                    }`}
                    readOnly={true}
                    placeholder={`${singleProduct?.PK} PC`}
                    value={pkitemsQuantity}
                    // onChange={(e) => {
                    //   !addProductToCartLoading &&
                    //     setpkItemsQuantity(e.target.value);
                    //   !addProductToCartLoading &&
                    //     setPkCount(
                    //       e.target.value >= singleProduct?.PK
                    //         ? parseFloat(
                    //             (e.target.value / singleProduct?.PK)
                    //               .toFixed(1)
                    //               .toString()
                    //               .split(".")[0]
                    //           )
                    //         : 0
                    //     );
                    //   if (
                    //     !/^\d+$/.test(e.target.value) &&
                    //     e.target.value !== ""
                    //   ) {
                    //     toast.dismiss();
                    //     return toast.error("Please enter valid value.");
                    //   }
                    // }}
                    disabled={
                      selectedItemType === "ctn" ||
                      findInCart?.product?._id === singleProduct?._id ||
                      addProductToCartLoading
                    }
                  />
                  <p>
                    <input
                      type="text"
                      value={pkCount}
                      className="outline-none"
                      onChange={(e) => {
                        handleChangePkCount(e);
                        // !addProductToCartLoading &&
                        //   setpkItemsQuantity(e.target.value);
                        // !addProductToCartLoading &&
                        //   setPkCount(
                        //     e.target.value >= singleProduct?.PK
                        //       ? parseFloat(
                        //           (e.target.value / singleProduct?.PK)
                        //             .toFixed(1)
                        //             .toString()
                        //             .split(".")[0]
                        //         )
                        //       : 0
                        //   );
                        if (
                          !/^\d+$/.test(e.target.value) &&
                          e.target.value !== ""
                        ) {
                          toast.dismiss();
                          return toast.error("Please enter valid value.");
                        }
                      }}
                      disabled={
                        selectedItemType === "ctn" ||
                        findInCart?.product?._id === singleProduct?._id ||
                        addProductToCartLoading
                      }
                      // className="absolute z-20 bg-transparent font-semibold top-1/2 -translate-y-1/2 left-36 max-w-[2rem] outline-none"
                    ></input>
                  </p>
                </div>
                <button
                  type="button"
                  className={`${
                    selectedItemType === "ctn" && "cursor-not-allowed"
                  } relative`}
                  disabled={addProductToCartLoading}
                >
                  <AiOutlinePlus
                    onClick={() =>
                      !addProductToCartLoading &&
                      handlePlusPkQuantity(
                        parseFloat(singleProduct?.PK),
                        parseFloat(pkCount + 1)
                      )
                    }
                    className="w-7 h-7 absolute z-10 -top-4"
                  />
                </button>
              </div>
              {/* ctn */}
              <p className="flex items-center gap-x-4">
                <input
                  name="quantity"
                  type="radio"
                  className="h-5 w-5 inline-block"
                  onChange={(e) => setSelectedItemType(e.target.value)}
                  value="ctn"
                  disabled={addProductToCartLoading}
                />
                <span>Order By CTN*</span>
              </p>
              <div className="flex w-full items-center gap-x-4 ">
                <button
                  type="button"
                  className={`${
                    selectedItemType === "pk" && "cursor-not-allowed"
                  }`}
                  disabled={addProductToCartLoading}
                >
                  <AiOutlineMinus
                    onClick={() =>
                      !addProductToCartLoading &&
                      handleMinusCTNQuantity(
                        parseFloat(singleProduct?.CTN),
                        parseFloat(ctnCount - 1)
                      )
                    }
                    className="w-7 h-7"
                  />
                </button>
                <p className="lg:w-1/3 md:w-1/2 w-10/12 relative">
                  <input
                    className={`w-full p-3 pr-14 rounded-md border outline-none border-BORDERGRAY text-black ${
                      selectedItemType === "pk" && "cursor-not-allowed"
                    }`}
                    placeholder={`${singleProduct?.CTN} PC`}
                    value={ctnItemQuantity}
                    onChange={(e) => {
                      setCtnItemQuantity(e.target.value);
                      if (
                        !/^\d+$/.test(e.target.value) &&
                        e.target.value !== ""
                      ) {
                        toast.dismiss();
                        return toast.error("Please enter valid value.");
                      }
                    }}
                    disabled={
                      selectedItemType === "pk" || addProductToCartLoading
                    }
                  />
                  <span className="absolute font-semibold top-1/2 -translate-y-1/2 right-2">
                    {ctnCount} CTN
                  </span>
                </p>
                <button
                  type="button"
                  className={`${
                    selectedItemType === "pk" && "cursor-not-allowed"
                  }`}
                  disabled={addProductToCartLoading}
                >
                  <AiOutlinePlus
                    onClick={() =>
                      !addProductToCartLoading &&
                      handlePlusCTNQuantity(
                        parseFloat(singleProduct?.CTN),
                        parseFloat(ctnCount + 1)
                      )
                    }
                    className="w-7 h-7"
                  />
                </button>
              </div>
              <p className="flex items-center gap-x-3 pb-3">
                <Link
                  to={
                    user === null
                      ? "/sign-in"
                      : findInCart !== null &&
                        singleProduct?._id === findInCart?.product?._id
                      ? "/cart"
                      : null
                  }
                >
                  <button
                    type="button"
                    className="bg-DARKRED text-white w-60 p-3 rounded-md hover:text-DARKRED hover:bg-white border border-DARKRED duration-300 ease-linear"
                    onClick={() => {
                      handleAddProduct(
                        singleProduct?._id,
                        singleProduct?.name,
                        selectedItemType === "pk"
                          ? pkitemsQuantity
                          : ctnItemQuantity
                      );
                      setSelectedProductId(singleProduct?._id);
                    }}
                    disabled={addProductToCartLoading}
                  >
                    {addProductToCartLoading &&
                    selectedProductId === singleProduct?._id ? (
                      "Adding..."
                    ) : findInCart !== null &&
                      singleProduct?._id === findInCart?.product?._id ? (
                      "Added"
                    ) : (
                      <>
                        {t("add_to_cart")}
                        <AiOutlineShoppingCart className="w-6 h-6 ml-2 inline-block" />
                      </>
                    )}
                  </button>
                </Link>
                {favouriteLoading ? (
                  "..."
                ) : isFavourite ? (
                  <AiFillHeart
                    className="w-10 h-10 text-DARKRED"
                    role="button"
                    onClick={() =>
                      handleRemoveFromFavourties(singleProduct?._id)
                    }
                  />
                ) : (
                  <AiOutlineHeart
                    className="w-10 h-10 text-DARKRED"
                    role="button"
                    onClick={() => handleAddtoFavourties(singleProduct?._id)}
                  />
                )}{" "}
              </p>
              <hr className="pt-3" />
              {/* <p className="text-2xl font-bold">Discription</p>
               <p className="text-black leading-normal w-11/12 pb-3">
                 {singleProduct?.description}
               </p>
               <hr className="pt-3" /> */}
              <p className="text-2xl font-bold">Specification</p>
              <p className="flex items-center justify-between w-full">
                <span className="font-normal">PK</span>
                <span className="font-semibold">{singleProduct?.PK}</span>
              </p>
              <p className="flex items-center justify-between w-full">
                <span className="font-normal">CTN</span>
                <span className="font-semibold">{singleProduct?.CTN}</span>
              </p>
              <p className="flex items-center justify-between w-full">
                <span className="font-normal">CTN Dimensions</span>
                <span className="font-semibold">
                  {singleProduct?.length}’’ x {singleProduct?.width}’’ x{" "}
                  {singleProduct?.height}’’
                </span>
              </p>
              <p className="flex items-center justify-between w-full">
                <span className="font-normal">PK Volume</span>
                <span className="font-semibold">
                  {singleProduct?.PKVolume} CUFT
                </span>
              </p>
              <p className="flex items-center justify-between w-full">
                <span className="font-normal">CTN Volume</span>
                <span className="font-semibold">
                  {singleProduct?.CTNVolume} CUFT
                </span>
              </p>
              <p className="flex items-center justify-between w-full">
                <span className="font-normal">PK Weight</span>
                <span className="font-semibold">
                  {singleProduct?.PKWeight} LBS
                </span>
              </p>
              <p className="flex items-center justify-between w-full">
                <span className="font-normal">CTN Weight</span>
                <span className="font-semibold">
                  {singleProduct?.CTNWeight} LBS
                </span>
              </p>
              <p className="flex items-center justify-between w-full">
                <span className="font-normal">Category</span>
                <span className="font-semibold">{singleProduct?.category}</span>
              </p>
              {/* <p className="flex items-center justify-between w-full">
                 <span className="font-normal">UPC Code</span>
                 <span className="font-semibold">6973096824116</span>
               </p>
               <p className="flex items-center justify-between w-full">
                 <span className="font-normal">Made by</span>
                 <span className="font-semibold">China</span>
               </p> */}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductDetailPopup;
