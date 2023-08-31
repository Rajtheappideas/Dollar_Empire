import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import ShoppingCart from "../components/cart/ShoppingCart";
import Checkout from "../components/cart/Checkout";
import PaymentInfo from "../components/cart/PaymentInfo";
import SuccessOrder from "../components/cart/SuccessOrder";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  calculateTotalAmount,
  calculateTotalQuantity,
  handleGetCart,
  handleChangeShippingMethod,
} from "../redux/CartSlice";
import { handleGetAddresses } from "../redux/GetContentSlice";
import { useRef } from "react";
import { handleChangeActiveComponent } from "../redux/GlobalStates";
import { ArrowLongLeftIcon } from "@heroicons/react/24/outline";

const Cart = () => {
  const [summaryFixed, setSummaryFixed] = useState(false);

  const { activeComponentForCart } = useSelector((state) => state.globalStates);
  const { token } = useSelector((state) => state.Auth);

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const AbortControllerRef = useRef(null);

  useEffect(() => {
    dispatch(handleGetCart({ token }));
    dispatch(handleGetAddresses({ token }));
    dispatch(handleChangeShippingMethod("pickup"));
    dispatch(handleChangeActiveComponent("Shopping Cart"));
    dispatch(calculateTotalQuantity());
    dispatch(calculateTotalAmount());

    return () => {
      AbortControllerRef.current !== null && AbortControllerRef.current.abort();
    };
  }, []);

  // for sticky summary component
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 333) {
        setSummaryFixed(true);
      } else {
        setSummaryFixed(false);
      }
    });
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, [window.scrollY]);

  return (
    <>
      <Helmet title={t("Cart | Dollar Empire")} />
      <section className="bg-white w-full lg:pb-20 lg:py-0 py-5">
        <div className="container mx-auto space_for_div space-y-5 w-full bg-white ">
          <h1 className="block font-semibold md:text-4xl text-2xl text-left py-1">
            {activeComponentForCart === "Check Out" ? (
              <ArrowLongLeftIcon
                className="h-8 w-8 inline-block mr-2"
                role="button"
                title="back ot previous section"
                onClick={() =>
                  dispatch(handleChangeActiveComponent("Shopping Cart"))
                }
              />
            ) : activeComponentForCart === "Payment Info" ? (
              <ArrowLongLeftIcon
                className="h-8 w-8 inline-block mr-2"
                role="button"
                title="back ot previous section"
                onClick={() =>
                  dispatch(handleChangeActiveComponent("Check Out"))
                }
              />
            ) : null}

            {activeComponentForCart === "Success"
              ? null
              : activeComponentForCart === "Shopping Cart"
              ? t("Shopping Cart")
              : activeComponentForCart === "Check Out"
              ? t("Check Out")
              : activeComponentForCart === "Payment Info"
              ? t("Payment Info")
              : "Success"}
          </h1>

          {activeComponentForCart === "Shopping Cart" && (
            <ShoppingCart summaryFixed={summaryFixed} />
          )}
          {activeComponentForCart === "Check Out" && (
            <Checkout summaryFixed={summaryFixed} />
          )}
          {activeComponentForCart === "Payment Info" && (
            <PaymentInfo summaryFixed={summaryFixed} />
          )}
          {activeComponentForCart === "Success" && <SuccessOrder />}
        </div>
      </section>
    </>
  );
};

export default Cart;
