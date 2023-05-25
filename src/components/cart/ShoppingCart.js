import React, { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { handleChangeActiveComponent } from "../../redux/GlobalStates";
import BaseUrl from "../../BaseUrl";
import {
  calculateTotalAmount,
  calculateTotalQuantity,
  handleAddProductToCart,
  handleDecreaseQuantityAndAmount,
  handleRemoveProductToCart,
  handleUpdateTotalQuantityAndAmount,
} from "../../redux/CartSlice";
import { toast } from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useTranslation } from "react-i18next";

const ShoppingCart = ({ summaryFixed }) => {
  const [showChangeField, setShowChangeField] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [productQuantity, setProductQuantity] = useState(0);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [productId, setProductId] = useState(null);

  const { grandTotal, subTotal, cartItems, loading } = useSelector(
    (state) => state.cart
  );
  const { token } = useSelector((state) => state.Auth);
  const { productListingPageLink } = useSelector((state) => state.globalStates);
  const { shipphingMethod } = useSelector((state) => state.orders);

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const AbortControllerRef = useRef(null);

  useEffect(() => {
    dispatch(calculateTotalQuantity());
    dispatch(calculateTotalAmount());
    return () => {
      AbortControllerRef.current !== null && AbortControllerRef.current.abort();
    };
  }, []);

  const handleRemoveFromCart = (id, quantity, amount) => {
    setDeleteLoading(true);
    const response = dispatch(
      handleRemoveProductToCart({ token, id, signal: AbortControllerRef })
    );
    if (response) {
      response
        .then((res) => {
          dispatch(handleDecreaseQuantityAndAmount({ quantity, amount, id }));
          setDeleteLoading(false);
        })
        .catch((err) => {
          setDeleteLoading(false);
          toast.error("Someting went worng, Try again!!!");
        });
    }
  };

  const handleUpdateProduct = (id, title, type, amount, quantity) => {
    toast.dismiss();
    if (productQuantity === quantity) {
      return toast.error(
        "Quantity should be increased or decreased, not be same!!!"
      );
    }
    if (!/^\d+$/.test(productQuantity)) {
      setProductQuantity(quantity);
      return toast.error("Please enter valid value!!!");
    }
    setUpdateLoading(true);
    const response = dispatch(
      handleAddProductToCart({
        token,
        id,
        signal: AbortControllerRef,
        type: type,
        quantity: productQuantity,
      })
    );
    if (response) {
      response
        .then((res) => {
          if (res.payload.status === "success") {
            toast.success(`${title}'s quantity updated.`);
            dispatch(
              handleUpdateTotalQuantityAndAmount({
                quantity: productQuantity > 0 ? productQuantity : 0,
                amount,
                id,
              })
            );
            setProductId(null);
          }
          setShowChangeField(false);
          setUpdateLoading(false);
          setProductQuantity(0);
        })
        .catch((err) => {
          toast.error(err.payload.message);
          setUpdateLoading(false);
        });
    }
  };
  return (
    <div className="relative w-full flex xl:flex-row flex-col items-start justify-start gap-4 pb-10 max-h-fit">
      {/* table */}
      <div className="xl:w-9/12 w-full xl:overflow-hidden overflow-x-scroll scrollbar">
        <table className="w-full">
          <thead className="bg-PRIMARY text-white p-2 w-full">
            <tr>
              <th className="lg:min-w-[20rem] min-w-[23rem] lg:p-3 p-2 font-semibold text-left text-base">
                {t("Product")}
              </th>
              <th className="lg:w-32 min-w-[8rem] lg:p-3 p-2 font-semibold text-left text-base">
                {t("Item Number")}
              </th>
              <th className="lg:w-28 min-w-[7rem] lg:p-3 p-2 font-semibold text-left text-base">
                {t("Unit Price")}
              </th>
              <th className="lg:w-28 min-w-[10rem] lg:p-3 p-2 font-semibold text-left text-base">
                {t("Quantity")}
              </th>
              <th className="lg:w-28 min-w-[5rem] lg:p-3 p-2 font-semibold text-left text-base">
                {t("Subtotal")}
              </th>
              <th className="lg:w-28 min-w-[3rem] lg:p-3 p-2 font-semibold text-cneter text-base">
                {t("Remove")}
              </th>
            </tr>
          </thead>
          <tbody>
            {loading || updateLoading ? (
              <tr>
                <td
                  colSpan="100%"
                  className="text-center font-semibold md:text-2xl text-xl pt-10"
                >
                  {t("Fetching your cart")}...
                </td>
              </tr>
            ) : cartItems.length <= 0 ? (
              <>
                <tr>
                  <td
                    colSpan="100%"
                    className="text-center font-semibold text-xl p-2"
                  >
                    {t("No items in cart")}.
                  </td>
                </tr>
                <tr>
                  <td colSpan="100%" className="text-center mx-auto py-3">
                    <Link to="/product-listing/all-products">
                      <button
                        type="button"
                        className="font-semibold mx-auto w-60 bg-PRIMARY text-white hover:bg-white hover:text-PRIMARY border border-PRIMARY duration-300 ease-in-out p-3 text-center"
                      >
                        {t("Go to products")}
                      </button>
                    </Link>
                  </td>
                </tr>
              </>
            ) : (
              cartItems.map((item) => (
                <tr
                  key={item?._id}
                  className="bg-white font-normal text-BLACK text-left"
                >
                  <td className="flex items-center gap-x-3 lg:p-5 p-3">
                    <img
                      src={BaseUrl.concat(item?.product?.images[0])}
                      alt={item?.product?.name}
                      className="min-w-[6rem] min-h-[6rem] max-w-[6rem] max-h-[6rem] object-contain object-center"
                    />
                    <p className="font-semibold md:text-lg text-left">
                      {item?.product?.name}
                    </p>
                  </td>
                  <td className="lg:p-5 p-3">#{item?.product?.number}</td>
                  <td className="lg:p-5 p-3">${item?.product?.price}</td>
                  <td className="whitespace-nowrap lg:p-5 p-3">
                    {productId !== item?.product?._id ? (
                      item.quantity
                    ) : (
                      <input
                        type="number"
                        className="bg-gray-300 outline-none text-black placeholder:text-BLACK h-10 rounded-md w-16 p-1"
                        value={productQuantity}
                        onChange={(e) => {
                          setProductQuantity(e.target.value);
                          if (
                            !/^\d+$/.test(e.target.value) &&
                            e.target.value !== ""
                          ) {
                            toast.dismiss();
                            return toast.error("Please enter valid value.");
                          }
                        }}
                      />
                    )}
                    {showChangeField && productId === item?.product?._id ? (
                      <span
                        role="button"
                        className="text-PRIMARY underline ml-1"
                        onClick={() =>
                          handleUpdateProduct(
                            item?.product?._id,
                            item?.product?.name,
                            item.type,
                            item?.product?.price * productQuantity,
                            item?.quantity
                          )
                        }
                      >
                        {t("Update")}
                      </span>
                    ) : (
                      <span
                        role="button"
                        className="text-PRIMARY underline ml-1"
                        onClick={() => {
                          setShowChangeField(true);
                          setProductQuantity(item?.quantity);
                          setProductId(item?.product?._id);
                        }}
                      >
                        {t("Change")}
                      </span>
                    )}
                  </td>
                  <td className="lg:p-5 p-3">
                    ${(item?.product?.price * item?.quantity).toFixed(2)}
                  </td>
                  <td className="lg:p-5 p-3">
                    {deleteLoading ? (
                      "..."
                    ) : (
                      <AiOutlineClose
                        role="button"
                        className="h-6 w-6 mx-auto"
                        color="red"
                        onClick={() =>
                          handleRemoveFromCart(
                            item?.product?._id,
                            item?.quantity,
                            item?.product?.price * item?.quantity
                          )
                        }
                      />
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* summary */}
      <div
        className={`xl:w-3/12 md:w-1/2 w-full space-y-3 bg-BACKGROUNDGRAY text-BLACK p-3 border border-gray-300 ml-auto ${
          summaryFixed ? "xl:sticky top-2 right-10" : "static"
        }`}
      >
        <p className="font-semibold text-xl">{t("Order Summary")}</p>
        <hr className="w-full" />
        <p className="w-full flex items-center justify-between text-base">
          <span className="font-normal">{t("Subtotal")}</span>
          <span className="ml-auto font-semibold text-base">
            ${parseFloat(grandTotal).toFixed(2)}{" "}
          </span>
        </p>
        <p className="w-full flex items-center justify-between text-base">
          <span className="font-normal">{t("Freight")}</span>
          <span className="ml-auto font-semibold text-base">
            ${shipphingMethod === "pickup" ? "0.00" : "10.00"}
          </span>
        </p>
        <hr className="w-full" />
        <p className="w-full flex items-center justify-between text-2xl font-bold">
          <span>{t("Grand Total")}</span>
          <span className="ml-auto">${parseFloat(grandTotal).toFixed(2)}</span>
        </p>
        <hr className="w-full" />
        <button
          type="button"
          onClick={() => {
            toast.dismiss();
            cartItems?.length > 0
              ? dispatch(handleChangeActiveComponent("Check Out"))
              : toast.error("Your Cart is empty!!!");
          }}
          className="font-semibold bg-PRIMARY text-white hover:bg-white hover:text-PRIMARY border border-PRIMARY duration-300 ease-in-out w-full p-3 text-center"
          // disabled={cartItems?.length}
        >
          {t("Proceed to checkout")}
        </button>
        <p>
          <Link
            to={
              productListingPageLink === ""
                ? "/product-listing/all-products"
                : productListingPageLink
            }
            state={{ title: "all-products", price: null, searchQuery: "" }}
          >
            <button
              type="button"
              className="font-semibold bg-black text-white hover:bg-white hover:text-black border border-black duration-300 ease-in-out w-full p-3 text-center"
            >
              {t("Continue to shopping")}
            </button>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ShoppingCart;
