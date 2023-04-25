import React, { useState } from "react";
import CardDetails from "./CardDetails";
import { useDispatch } from "react-redux";
import { handleChangeActiveComponent } from "../../redux/GlobalStates";

const PaymentInfo = ({}) => {
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [paymentOption, setPaymentOption] = useState({
    noPayment: false,
    cardDetails: true,
  });

  const dispatch = useDispatch();

  return (
    <div className="w-full flex xl:flex-row flex-col items-start justify-start gap-4 pb-10">
      {/* table */}
      {showCardDetails && paymentOption.cardDetails ? (
        <CardDetails />
      ) : (
        <div className="xl:w-9/12 w-full space-y-3">
          <p className="bg-PRIMARY text-white p-4 w-full text-left font-semibold tracking-wide">
            Method
          </p>
          <div className="w-full border border-gray-300 rounded-md p-5">
            <div className="w-full flex justify-start items-center gap-x-5 bg-white">
              <input
                onChange={(e) =>
                  setPaymentOption({ cardDetails: false, noPayment: true })
                }
                name="checkout"
                type="radio"
                className="w-6 h-6"
                checked={paymentOption.noPayment}
              />
              <p>
                <span className="font-semibold text-xl block">No payment</span>
                <span className="font-normal text-base block">
                  Our sales will contact you for payment information.
                </span>
              </p>
            </div>
          </div>
          <div className="w-full border border-gray-300 rounded-md p-5">
            <div className="w-full flex justify-start items-center gap-x-5 bg-white">
              <input
                onChange={(e) =>
                  setPaymentOption({ noPayment: false, cardDetails: true })
                }
                checked={paymentOption.cardDetails}
                name="checkout"
                type="radio"
                className="w-6 h-6"
              />
              <p>
                <span className="font-semibold text-xl block">
                  Pay by Credit card
                </span>
                <span className="font-normal text-base block">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
      {/* summary */}
      <div className="xl:w-3/12 lg:w-1/3 md:w-1/2 w-full space-y-3 bg-BACKGROUNDGRAY text-BLACK p-3 border border-gray-300 ml-auto">
        <p className="font-semibold text-xl">Order Summary</p>
        <hr className="w-full" />
        <p className="w-full flex items-center justify-between text-base">
          <span className="font-normal">Subtotal</span>
          <span className="ml-auto font-semibold text-base">$620.00</span>
        </p>
        <p className="w-full flex items-center justify-between text-base">
          <span className="font-normal">Freight</span>
          <span className="ml-auto font-semibold text-base">$10.00</span>
        </p>
        <hr className="w-full" />
        <p className="w-full flex items-center justify-between text-2xl font-bold">
          <span>Grand Total</span>
          <span className="ml-auto">$630.00</span>
        </p>
        <hr className="w-full" />

        <button
          type="button"
          className="font-semibold bg-PRIMARY text-white hover:bg-white hover:text-PRIMARY border border-PRIMARY duration-300 ease-in-out w-full p-3 text-center"
          onClick={() => {
            paymentOption.cardDetails && !showCardDetails
              ? setShowCardDetails(true)
              : dispatch(handleChangeActiveComponent("Success"));
          }}
        >
          {!paymentOption.cardDetails || showCardDetails
            ? "Confirm order"
            : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default PaymentInfo;
