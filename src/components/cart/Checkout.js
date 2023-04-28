import React, { useState } from "react";
import EditAddressPopup from "./EditAddressPopup";
import { handleChangeActiveComponent } from "../../redux/GlobalStates";
import { useDispatch } from "react-redux";

const Checkout = ({}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [shipphingMethod, setShipphingMethod] = useState({
    freight: true,
    pickup: false,
  });

  const dispatch = useDispatch();

  return (
    <div className="w-full flex xl:flex-row flex-col items-start justify-start gap-4 pb-10">
      {showPopup && (
        <EditAddressPopup setShowPopup={setShowPopup} showPopup={showPopup} />
      )}

      {/* left side div */}
      <div className="xl:w-9/12 w-full space-y-3">
        <p className="bg-PRIMARY text-white p-4 w-full text-left font-semibold tracking-wide">
          Shipping Method
        </p>
        <div className="w-full border border-gray-300 rounded-md md:p-5 p-2">
          <div className="w-full flex justify-start items-center gap-x-5 bg-white">
            <input
              name="checkout"
              onChange={() =>
                setShipphingMethod({ pickup: true, freight: false })
              }
              type="radio"
              className="w-6 h-6"
              checked={shipphingMethod.pickup}
            />
            <p>
              <span className="font-semibold text-xl block">Pickup</span>
              <span className="font-normal text-base block">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </span>
            </p>
          </div>
        </div>
        <div className="w-full border border-gray-300 rounded-md md:p-5 p-2">
          <div className="w-full flex justify-start items-center gap-x-5 bg-white">
            <input
              name="checkout"
              onChange={() =>
                setShipphingMethod({ pickup: false, freight: true })
              }
              type="radio"
              className="w-6 h-6"
              checked={shipphingMethod.freight}
            />
            <p>
              <span className="font-semibold text-xl block">Freight</span>
              <span className="font-normal text-base block">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </span>
            </p>
          </div>
        </div>
        <ul className="w-full list-disc text-left font-normal space-y-3 pl-5 leading-relaxed">
          <li>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting.
          </li>
          <li>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting.
          </li>
        </ul>
        <div className="pt-12">
          <p className="bg-PRIMARY text-white p-4 w-full text-left font-semibold tracking-wide">
            Shipping Address
          </p>
        </div>
        <div className="w-full border border-gray-300 rounded-md p-5 font-normal text-left space-y-3 text-[#282828]">
          <p className="font-semibold text-xl">John</p>
          <p>Company name</p>
          <p className="w-4/12">
            4127 State Street, Michigan, Southfield 48075 United States
          </p>
          <p>+01 123456475</p>
          <p role="button" className="text-PRIMARY">
            Edit
          </p>
        </div>
        <button
          type="button"
          className="bg-PRIMARY text-white hover:bg-white hover:text-PRIMARY duration-300 ease-in-out border border-PRIMARY w-60 rounded-md text-center p-4 font-semibold"
          onClick={() => {
            setShowPopup(true);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          Add New Address
        </button>
      </div>
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
          <span className="ml-auto font-semibold text-base">
            {shipphingMethod.pickup ? "$ 0.00" : "$ 10.00"}
          </span>
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
          onClick={() => dispatch(handleChangeActiveComponent("Payment_Info"))}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Checkout;
