import React, { useState } from "react";
import { Helmet } from "react-helmet";
import ShoppingCart from "../components/cart/ShoppingCart";
import Checkout from "../components/cart/Checkout";
import PaymentInfo from "../components/cart/PaymentInfo";
import SuccessOrder from "../components/cart/SuccessOrder";

const Cart = () => {
  const [activeComponent, setActiveComponent] = useState("Shopping Cart");

  return (
    <>
      <Helmet title="Cart" />
      <section className="bg-white w-full ">
        <div className="container mx-auto space_for_div space-y-5 w-full bg-white lg:pb-20 pb-10">
          <h1 className="block font-semibold md:text-4xl text-2xl text-left py-1">
            {activeComponent === "Success" ? null : activeComponent}
          </h1>

          {activeComponent === "Shopping Cart" && (
            <ShoppingCart
              setActiveComponent={setActiveComponent}
              activeComponent={activeComponent}
            />
          )}
          {activeComponent === "Check Out" && (
            <Checkout
              setActiveComponent={setActiveComponent}
              activeComponent={activeComponent}
            />
          )}
          {activeComponent === "Payment Info" && (
            <PaymentInfo
              setActiveComponent={setActiveComponent}
              activeComponent={activeComponent}
            />
          )}
          {activeComponent === "Success" && <SuccessOrder />}
        </div>
      </section>
    </>
  );
};

export default Cart;
