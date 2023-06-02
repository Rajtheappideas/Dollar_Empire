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
import {
  closePopup,
  handleChangeActiveComponent,
  showPopup,
} from "../redux/GlobalStates";
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
  const [changeTo, setChangeTo] = useState(false);
  const [changingLoading, setChangingLoading] = useState(false);

  const { user, token } = useSelector((state) => state.Auth);
  const { singleProductId } = useSelector((state) => state.globalStates);
  const { singleProduct, singleProductLoading } = useSelector(
    (state) => state.products
  );
  const { cart, cartItems } = useSelector((state) => state.cart);

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
      setCtnCount(0);
      return true;
    } else if (selectedItemType === "ctn" && pkitemsQuantity > 0) {
      toast.error("Please enter quantity in CTN, you choose CTN");
      setpkItemsQuantity("");
      setPkCount(0);
      return true;
    } else if (
      !/^\d+$/.test(pkitemsQuantity !== "" ? pkitemsQuantity : ctnItemQuantity)
    ) {
      setCtnItemQuantity("");
      setpkItemsQuantity("");
      setPkCount(0);
      setCtnCount(0);
      return toast.error("Please enter valid value!!!");
    }
    setSelectedProductId(singleProduct?._id);
    setAddProductToCartLoading(true);
    const response = dispatch(
      handleAddProductToCart({
        token,
        id,
        signal: AbortControllerRef,
        type: selectedItemType,
        quantity: selectedItemType === "pk" ? pkCount : ctnCount,
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
            setCtnCount(0);
            setPkCount(0);
            setSelectedItemType("pk");
            setSelectedProductId(null);
            setAddProductToCartLoading(false);
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

  const handleChangeAddedItemInCart = (action, type) => {
    toast.remove();
    if (
      findInCart !== null &&
      findInCart?.product?._id === singleProduct?._id
    ) {
      if (findInCart?.type === type) {
        if (action == "plus") {
          setChangeTo(true);
          setFindInCart({ ...findInCart, quantity: findInCart?.quantity + 1 });
        } else if (action === "minus") {
          setChangeTo(true);
          if (findInCart?.quantity == 1) {
            toast.error("Minimum quantity should be more than 0!!!");
            return true;
          }
          setFindInCart({
            ...findInCart,
            quantity: findInCart?.quantity == 1 ? 1 : findInCart?.quantity - 1,
          });
        }
      } else {
        toast.error(`Please change quantity in ${findInCart?.type}`);
        return true;
      }
    }
  };

  const handleSubmitAddProduct = () => {
    if (singleProduct?._id !== findInCart?.product?._id) {
      handleAddProduct(
        singleProduct?._id,
        singleProduct?.name,
        selectedItemType === "pk" ? pkitemsQuantity : ctnItemQuantity,
        selectedItemType === "pk"
          ? pkitemsQuantity * singleProduct?.price
          : ctnItemQuantity * singleProduct?.price
      );
    } else if (
      changeTo &&
      findInCart !== null &&
      singleProduct?._id === findInCart?.product?._id
    ) {
      setChangingLoading(true);
      const response = dispatch(
        handleAddProductToCart({
          token,
          id: findInCart?.product?._id,
          signal: AbortControllerRef,
          type: findInCart?.type,
          quantity: findInCart?.quantity,
        })
      );
      if (response) {
        response
          .then((res) => {
            if (res.payload.status === "success") {
              toast.success(`${findInCart?.product?.name}'s quantity updated.`);
              dispatch(
                handleUpdateTotalQuantityAndAmount({
                  quantity: findInCart?.quantity,
                  id: findInCart?.product?._id,
                })
              );
              setChangingLoading(false);
              setChangeTo(false);
            }
          })
          .catch((err) => {
            toast.error(err.payload.message);
            setChangingLoading(false);
            setChangeTo(false);
          });
      }
    } else {
      dispatch(handleChangeActiveComponent("Shopping Cart"));
    }
  };

  useEffect(() => {
    dispatch(handleGetProductById({ id: singleProductId, token }));
    return () => {
      AbortControllerRef.current !== null && AbortControllerRef.current.abort();
      setFindInCart(null);
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
                  disabled={
                    addProductToCartLoading ||
                    findInCart?.product?._id === singleProduct?._id
                  }
                />
                <span>Order By PK*</span>
              </p>
              {/* pk */}
              <div className="flex w-full items-center gap-x-4">
                <button type="button" disabled={addProductToCartLoading}>
                  <AiOutlineMinus
                    onClick={() => {
                      !addProductToCartLoading &&
                        selectedProductId !== findInCart?.product?._id &&
                        handleMinusPkQuantity(
                          parseFloat(singleProduct?.PK),
                          parseFloat(pkCount - 1)
                        );
                      findInCart?.product?._id === singleProduct?._id &&
                        handleChangeAddedItemInCart("minus", "pk");
                    }}
                    className="w-7 h-7"
                  />
                </button>
                <p
                  className={`lg:w-1/3 md:w-1/2 w-10/12 relative  ${
                    selectedItemType === "ctn" && "cursor-not-allowed"
                  }`}
                >
                  <span
                    className={`absolute  top-1/2 w-full max-w-[4rem] text-sm ${
                      pkitemsQuantity === ""
                        ? "text-gray-400 font-normal"
                        : "text-BLACK font-semibold"
                    } ${
                      selectedItemType === "ctn"
                        ? "cursor-not-allowed"
                        : "cursor-default"
                    }
                    -translate-y-1/2 left-2`}
                  >
                    {`${
                      pkitemsQuantity === ""
                        ? singleProduct?.PK
                        : pkitemsQuantity
                    } PC`}
                  </span>
                  <input
                    className={`w-full font-semibold text-right p-3 pr-7 pl-16 placeholder:text-black rounded-md border outline-none border-BORDERGRAY text-black ${
                      selectedItemType === "ctn" && "cursor-not-allowed"
                    }`}
                    type="number"
                    placeholder="0"
                    min="0"
                    value={pkCount}
                    onChange={(e) => {
                      if (
                        !/^(?=.*[1-9])\d{1,8}(?:\.\d\d?)?$/.test(e.target.value)
                      ) {
                        toast.remove();
                        toast.error("Please enter valid value.");
                        setPkCount(0);
                        setpkItemsQuantity("");
                        return true;
                      }
                      if (e.target.value.length > 7) {
                        toast.remove();
                        toast.error("Can't add more than 7 numbers !!!");
                        return true;
                      }
                      setPkCount(e.target.value.replace(/^0+/, ""));
                      setpkItemsQuantity(
                        e.target.value.replace(/^0+/, "") * singleProduct?.PK
                      );
                    }}
                    disabled={
                      selectedItemType === "ctn" || addProductToCartLoading
                    }
                  />
                  <span className="absolute font-semibold right-2 top-1/2 -translate-y-1/2">
                    PK
                  </span>
                </p>
                <button type="button" disabled={addProductToCartLoading}>
                  <AiOutlinePlus
                    onClick={() => {
                      if (pkCount.length >= 7) {
                        toast.remove();
                        toast.error("Can't add more than 7 numbers !!!");
                        return true;
                      }
                      !addProductToCartLoading &&
                        selectedProductId !== findInCart?.product?._id &&
                        handlePlusPkQuantity(
                          parseInt(singleProduct?.PK),
                          parseInt(pkCount + 1)
                        );
                      findInCart?.product?._id === singleProduct?._id &&
                        handleChangeAddedItemInCart("plus", "pk");
                    }}
                    className="w-7 h-7"
                  />
                </button>
              </div>
              {/* old pk */}
              {/* <div className="flex w-full items-center gap-x-4 ">
                <button type="button" disabled={addProductToCartLoading}>
                  <AiOutlineMinus
                    onClick={() => {
                      !addProductToCartLoading &&
                        selectedProductId !== findInCart?.product?._id &&
                        handleMinusPkQuantity(
                          parseFloat(singleProduct?.PK),
                          parseFloat(pkCount - 1)
                        );
                      findInCart?.product?._id === singleProduct?._id &&
                        handleChangeAddedItemInCart("minus", "pk");
                    }}
                    className="w-7 h-7"
                  />
                </button>
                <p className="lg:w-1/3 md:w-1/2 w-10/12 relative">
                  <input
                    className={`w-full p-3 pr-14 rounded-md border outline-none border-BORDERGRAY text-black ${
                      selectedItemType === "pk" && "cursor-not-allowed"
                    }`}
                    placeholder={`${singleProduct?.PK} PC`}
                    value={pkitemsQuantity}
                    onChange={(e) => {
                      setpkItemsQuantity(e.target.value);
                      if (
                        !/^\d+$/.test(e.target.value) &&
                        e.target.value !== ""
                      ) {
                        toast.dismiss();
                        return toast.error("Please enter valid value.");
                      }
                    }}
                    disabled={
                      selectedItemType === "ctn" || addProductToCartLoading
                    }
                  />
                  <span className="absolute font-semibold top-1/2 -translate-y-1/2 right-2">
                    {pkCount} PK
                  </span>
                </p>
                <button type="button" disabled={addProductToCartLoading}>
                  <AiOutlinePlus
                    onClick={() => {
                      !addProductToCartLoading &&
                        selectedProductId !== findInCart?.product?._id &&
                        handlePlusPkQuantity(
                          parseFloat(singleProduct?.PK),
                          parseFloat(pkCount + 1)
                        );
                      findInCart?.product?._id === singleProduct?._id &&
                        handleChangeAddedItemInCart("plus", "pk");
                    }}
                    className="w-7 h-7"
                  />
                </button>
              </div> */}
              {/* ctn */}
              <p className="flex items-center gap-x-4">
                <input
                  name="quantity"
                  type="radio"
                  className="h-5 w-5 inline-block"
                  onChange={(e) => setSelectedItemType(e.target.value)}
                  value="ctn"
                  disabled={
                    addProductToCartLoading ||
                    findInCart?.product?._id === singleProduct?._id
                  }
                />
                <span>Order By CTN*</span>
              </p>
              {/* old ctn */}
              {/* <div className="flex w-full items-center gap-x-4 ">
                <button type="button" disabled={addProductToCartLoading}>
                  <AiOutlineMinus
                    onClick={() => {
                      !addProductToCartLoading &&
                        handleMinusCTNQuantity(
                          parseFloat(singleProduct?.CTN),
                          parseFloat(ctnCount - 1)
                        );
                      findInCart?.product?._id === singleProduct?._id &&
                        handleChangeAddedItemInCart("minus", "ctn");
                    }}
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
                <button type="button" disabled={addProductToCartLoading}>
                  <AiOutlinePlus
                    onClick={() => {
                      !addProductToCartLoading &&
                        handlePlusCTNQuantity(
                          parseFloat(singleProduct?.CTN),
                          parseFloat(ctnCount + 1)
                        );
                      findInCart?.product?._id === singleProduct?._id &&
                        handleChangeAddedItemInCart("plus", "ctn");
                    }}
                    className="w-7 h-7"
                  />
                </button>
              </div> */}
              <div className="flex w-full items-center gap-x-4 ">
                <button type="button" disabled={addProductToCartLoading}>
                  <AiOutlineMinus
                    onClick={() => {
                      !addProductToCartLoading &&
                        handleMinusCTNQuantity(
                          parseFloat(singleProduct?.CTN),
                          parseFloat(ctnCount - 1)
                        );
                      findInCart?.product?._id === singleProduct?._id &&
                        handleChangeAddedItemInCart("minus", "ctn");
                    }}
                    className="w-7 h-7"
                  />
                </button>
                <p
                  className={`lg:w-1/3 md:w-1/2 w-10/12 relative
                ${selectedItemType === "pk" && "cursor-not-allowed"}
                `}
                >
                  <span
                    className={`absolute  top-1/2 w-full max-w-[4rem] text-sm ${
                      ctnItemQuantity === ""
                        ? "text-gray-400 font-normal"
                        : "text-BLACK font-semibold"
                    } ${
                      selectedItemType === "pk"
                        ? "cursor-not-allowed"
                        : "cursor-default"
                    }
                    -translate-y-1/2 left-2`}
                  >
                    {`${
                      ctnItemQuantity === ""
                        ? singleProduct?.CTN
                        : ctnItemQuantity
                    } PC`}
                  </span>
                  <input
                    className={`w-full font-semibold text-right p-3 pr-9 pl-16 placeholder:text-black rounded-md border outline-none border-BORDERGRAY text-black ${
                      selectedItemType === "pk" && "cursor-not-allowed"
                    }`}
                    placeholder="0"
                    value={ctnCount}
                    onChange={(e) => {
                      if (
                        !/^(?=.*[1-9])\d{1,8}(?:\.\d\d?)?$/.test(e.target.value)
                      ) {
                        toast.remove();
                        toast.error("Please enter valid value.");
                        setCtnCount(0);
                        setCtnItemQuantity("");
                        return true;
                      }
                      if (e.target.value.length > 7) {
                        toast.remove();
                        toast.error("Can't add more than 7 numbers !!!");
                        return true;
                      }
                      setCtnCount(e.target.value.replace(/^0+/, ""));
                      setCtnItemQuantity(
                        e.target.value.replace(/^0+/, "") * singleProduct?.CTN
                      );
                    }}
                    disabled={
                      selectedItemType === "pk" || addProductToCartLoading
                    }
                  />
                  <span className="absolute font-semibold right-1 top-1/2 -translate-y-1/2">
                    CTN
                  </span>
                </p>
                <button type="button" disabled={addProductToCartLoading}>
                  <AiOutlinePlus
                    onClick={() => {
                      if (ctnCount.length >= 7) {
                        toast.remove();
                        toast.error("Can't add more than 7 numbers !!!");
                        return true;
                      }
                      !addProductToCartLoading &&
                        handlePlusCTNQuantity(
                          parseFloat(singleProduct?.CTN),
                          parseFloat(ctnCount + 1)
                        );
                      findInCart?.product?._id === singleProduct?._id &&
                        handleChangeAddedItemInCart("plus", "ctn");
                    }}
                    className="w-7 h-7"
                  />
                </button>
              </div>
              {/* cart btn */}
              <p className="flex items-center gap-x-3 pb-3">
                <Link
                  to={
                    user === null
                      ? "/sign-in"
                      : findInCart !== null &&
                        singleProduct?._id === findInCart?.product?._id &&
                        !changeTo
                      ? "/cart"
                      : null
                  }
                >
                  {changingLoading ? (
                    <button
                      type="button"
                      className="bg-DARKRED text-white w-60 p-3 rounded-md hover:text-DARKRED hover:bg-white border border-DARKRED duration-300 ease-linear"
                      disabled={changingLoading}
                    >
                      {t("Changing").concat("...")}
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="bg-DARKRED text-white w-60 p-3 rounded-md hover:text-DARKRED hover:bg-white border border-DARKRED duration-300 ease-linear"
                      onClick={() => {
                        handleSubmitAddProduct();
                      }}
                      disabled={addProductToCartLoading}
                    >
                      {addProductToCartLoading &&
                      selectedProductId === singleProduct?._id ? (
                        t("Adding").concat("...")
                      ) : findInCart !== null &&
                        singleProduct?._id === findInCart?.product?._id ? (
                        `${changeTo ? t("Change to") : t("Added")} ${
                          findInCart?.quantity
                        } ${findInCart?.type}`
                      ) : (
                        <>
                          {t("add_to_cart")}
                          <AiOutlineShoppingCart className="w-6 h-6 ml-2 inline-block" />
                        </>
                      )}
                    </button>
                  )}
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
