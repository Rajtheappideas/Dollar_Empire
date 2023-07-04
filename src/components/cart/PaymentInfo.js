import React, { useRef, useState } from "react";
import CardDetails from "./CardDetails";
import { useDispatch, useSelector } from "react-redux";
import { handleChangeActiveComponent } from "../../redux/GlobalStates";
import {
  handleChangeOrderId,
  handleChangePaymentOption,
  handleCreateOrder,
} from "../../redux/OrderSlice";
import { Toaster, toast } from "react-hot-toast";
import { handleClearCart, handleGetCart } from "../../redux/CartSlice";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const PaymentInfo = ({ summaryFixed }) => {
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [additionalNotes, setAdditionalNotes] = useState("");

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const AbortControllerRef = useRef(null);

  const { token } = useSelector((state) => state.Auth);

  const { grandTotal } = useSelector((state) => state.cart);

  const { paymentOption, loading, shipphingMethod, shippingAddressId } =
    useSelector((state) => state.orders);

  const handleConfirmOrder = () => {
    toast.dismiss();
    if (shippingAddressId === "" && shipphingMethod === "freight") {
      return toast.error("Please select the shipping address!!!");
    } else if (shipphingMethod === "") {
      return toast.error("Please select the shipping method!!!");
    } else if (paymentOption === "") {
      return toast.error("Please choose the Payment option!!!");
    }
    const response = dispatch(
      handleCreateOrder({
        token,
        signal: AbortControllerRef,
        shippingMethod: shipphingMethod,
        shippingAddress: shippingAddressId,
        paymentMethod: paymentOption,
        additionalNotes,
      })
    );
    if (response) {
      response
        .then((res) => {
          if (res?.meta?.arg?.signal?.current?.signal?.aborted) {
            return toast.error("Request Cancelled.");
          }
          if (res.payload.status === "success") {
            dispatch(handleChangeActiveComponent("Success"));
            dispatch(handleClearCart());
            toast.success("Order Submitted successfully.");
            window.scrollTo({ top: 0, behavior: "smooth" });
          } else {
            return toast.error(res.payload.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="w-full pb-10">
      {/* table */}
      <Toaster />

      {showCardDetails && paymentOption === "cardPayment" ? (
        <CardDetails
          summaryFixed={summaryFixed}
          additionalNotes={additionalNotes}
        />
      ) : (
        <div className="w-full flex xl:flex-row flex-col items-start justify-start gap-4 pb-10">
          <div className="xl:w-9/12 w-full space-y-3">
            <p className="bg-PRIMARY text-white p-4 w-full text-left font-semibold tracking-wide">
              {t("Method")}
            </p>
            <div className="w-full border border-gray-300 rounded-md p-5">
              <div className="w-full flex justify-start items-center gap-x-5 bg-white">
                <input
                  onChange={(e) =>
                    dispatch(handleChangePaymentOption("contactForPayment"))
                  }
                  name="checkout"
                  type="radio"
                  className="w-6 h-6 cursor-pointer"
                  checked={paymentOption === "contactForPayment"}
                  disabled={loading}
                />
                <p>
                  <span className="font-semibold text-xl block">
                    {t("Contact for Payment (Returning Customers)")}
                  </span>
                  <span className="font-normal text-base block">
                    {t("Our sales will contact you for payment information")}.
                  </span>
                </p>
              </div>
            </div>
            <div className="w-full border border-gray-300 rounded-md p-5">
              <div className="w-full flex justify-start items-center gap-x-5 bg-white">
                <input
                  onChange={(e) =>
                    dispatch(handleChangePaymentOption("cardPayment"))
                  }
                  checked={paymentOption === "cardPayment"}
                  name="checkout"
                  type="radio"
                  className="w-6 h-6 cursor-pointer"
                  disabled={loading}
                />
                <p>
                  <span className="font-semibold text-xl block">
                    {t("Pay by Credit card")}
                  </span>
                  <span className="font-normal text-base block">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </span>
                </p>
              </div>
            </div>
            <div className="w-full space-y-2">
              <label className="font-semibold tracking-normal text-lg">
                Note:
              </label>
              <textarea
                onChange={(e) => setAdditionalNotes(e.target.value.trim())}
                name="note"
                className="w-full border max-h-60 min-h-[5rem] border-gray-300 outline-none focus:border-gray-500 rounded-md p-5"
                disabled={loading}
                placeholder="Any note for your order..."
              />
            </div>
          </div>
          {/* summary */}
          <div
            className={`xl:w-3/12 lg:w-1/3 md:w-1/2 w-full space-y-3 bg-BACKGROUNDGRAY text-BLACK p-3 border border-gray-300 ml-auto ${
              summaryFixed ? "xl:sticky top-2 right-10" : "static"
            }`}
          >
            <p className="font-semibold text-xl">{t("Order Summary")}</p>
            <hr className="w-full" />
            <p className="w-full flex items-center justify-between text-base">
              <span className="font-normal">{t("Subtotal")}</span>
              <span className="ml-auto font-semibold text-base">
                ${parseFloat(grandTotal).toFixed(2)}{" "}
              </span>{" "}
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
              <span className="ml-auto">
                ${parseFloat(grandTotal).toFixed(2)}
              </span>
            </p>
            <hr className="w-full" />

            <button
              type="button"
              className="font-semibold bg-PRIMARY text-white hover:bg-white hover:text-PRIMARY border border-PRIMARY duration-300 ease-in-out w-full p-3 text-center"
              onClick={() => {
                paymentOption === "cardPayment" && !showCardDetails
                  ? setShowCardDetails(true)
                  : handleConfirmOrder();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              disabled={loading}
            >
              {loading
                ? t("Submitting Order").concat("...")
                : paymentOption === "contactForPayment"
                ? t("Confirm order")
                : t("Continue")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentInfo;
