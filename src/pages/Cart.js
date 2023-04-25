import React, { useState } from "react";
import { Helmet } from "react-helmet";
import ShoppingCart from "../components/cart/ShoppingCart";
import Checkout from "../components/cart/Checkout";
import PaymentInfo from "../components/cart/PaymentInfo";
import SuccessOrder from "../components/cart/SuccessOrder";
import { useSelector } from "react-redux";

const Cart = () => {
  const { activeComponentForCart } = useSelector((state) => state.globalStates);

  return (
    <>
      <Helmet title="Cart" />
      <section className="bg-white w-full lg:pb-20 lg:py-0 py-10">
        <div className="container mx-auto space_for_div space-y-5 w-full bg-white ">
          <h1 className="block font-semibold md:text-4xl text-2xl text-left py-1">
            {activeComponentForCart === "Success"
              ? null
              : activeComponentForCart.replace("_", " ")}
          </h1>

          {activeComponentForCart === "Shopping_Cart" && <ShoppingCart />}
          {activeComponentForCart === "Check_Out" && <Checkout />}
          {activeComponentForCart === "Payment_Info" && <PaymentInfo />}
          {activeComponentForCart === "Success" && <SuccessOrder />}
        </div>
      </section>
    </>
  );
};

export default Cart;
