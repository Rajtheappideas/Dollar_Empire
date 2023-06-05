import React, { useEffect, useState } from "react";
import EditAddressPopup from "./EditAddressPopup";
import { handleChangeActiveComponent } from "../../redux/GlobalStates";
import { useDispatch, useSelector } from "react-redux";
import { changeGrandTotal } from "../../redux/CartSlice";
import AddNewAddress from "./AddNewAddress";
import { toast } from "react-hot-toast";
import {
  handleChangeShippingAddressId,
  handleChangeShippingMethod,
} from "../../redux/OrderSlice";
import { useTranslation } from "react-i18next";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

const Checkout = ({ summaryFixed }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [addressId, setAddressId] = useState(null);
  const [showAddnewaddressPopup, setShowAddnewaddressPopup] = useState(false);

  const { t } = useTranslation();

  const { grandTotal } = useSelector((state) => state.cart);
  const { shippingAddressId, shipphingMethod } = useSelector(
    (state) => state.orders
  );
  const { addressList, loading } = useSelector((state) => state.getContent);
  const dispatch = useDispatch();

  useEffect(() => {
    if (shipphingMethod === "freight") {
      dispatch(changeGrandTotal("freight"));
    } else {
      dispatch(changeGrandTotal("pickup"));
    }
  }, [shipphingMethod]);

  const handlechangeActiveComponent = () => {
    toast.dismiss();
    if (shippingAddressId === "") {
      return toast.error("Please select the shipping address.");
    }
    dispatch(handleChangeActiveComponent("Payment Info"));
  };
  useEffect(() => {
    setAddressId(addressList[0]?._id);
    dispatch(handleChangeShippingAddressId(addressList[0]?._id));
  }, []);
  return (
    <div className="w-full flex xl:flex-row flex-col items-start justify-start gap-4 pb-10">
      {showPopup && (
        <EditAddressPopup
          addressId={addressId}
          setShowPopup={setShowPopup}
          showPopup={showPopup}
        />
      )}
      {showAddnewaddressPopup && (
        <AddNewAddress
          setShowAddnewaddressPopup={setShowAddnewaddressPopup}
          showAddnewaddressPopup={showAddnewaddressPopup}
        />
      )}

      {/* left side div */}
      <div className="xl:w-9/12 w-full space-y-3">
        <p className="bg-PRIMARY text-white p-4 w-full text-left font-semibold tracking-wide">
          {t("Shipping Method")}
        </p>
        <div className="w-full border border-gray-300 rounded-md md:p-5 p-2">
          <div className="w-full flex justify-start items-center gap-x-5 bg-white">
            <input
              name="checkout"
              onChange={() => {
                dispatch(handleChangeShippingMethod("pickup"));
              }}
              type="radio"
              className="w-6 h-6 cursor-pointer"
              checked={shipphingMethod === "pickup"}
            />
            <p>
              <span className="font-semibold text-xl block">{t("Pickup")}</span>
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
              onChange={() => {
                dispatch(handleChangeShippingMethod("freight"));
              }}
              type="radio"
              className="w-6 h-6 cursor-pointer"
              checked={shipphingMethod === "freight"}
            />
            <p>
              <span className="font-semibold text-xl block">
                {t("Freight")}
              </span>
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
            {t("Shipping Address")}
          </p>
        </div>
        {loading ? (
          <p>{t("loading")}...</p>
        ) : (
          addressList.length > 0 &&
          addressList !== undefined &&
          addressList.map((address) => (
            <div
              key={address?._id}
              className={`${
                shippingAddressId === address?._id && "bg-gray-200"
              } cursor-pointer relative w-full border border-gray-300 rounded-md p-5 font-normal text-left space-y-3 text-[#282828]`}
              onClick={() =>
                dispatch(handleChangeShippingAddressId(address?._id))
              }
            >
              <p className="font-semibold text-xl">{address?.fname}</p>
              <p>{address?.companyName}</p>
              <p className="w-4/12">
                {address?.location}, {address?.city}, {address?.state}{" "}
                {address?.postalCode} {address?.country}
              </p>
              <p>{address?.phone}</p>
              <p
                role="button"
                onClick={() => {
                  setShowPopup(true);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  setAddressId(address?._id);
                }}
                className="text-PRIMARY inline-block"
              >
                {t("Edit")}
              </p>
              {shippingAddressId === address?._id && (
                <CheckCircleIcon
                  title="selected address"
                  className="absolute top-2 right-3 w-12 h-12 text-green-500 bg-white rounded-full p-2"
                ></CheckCircleIcon>
              )}
            </div>
          ))
        )}

        <button
          type="button"
          className="bg-PRIMARY text-white hover:bg-white hover:text-PRIMARY duration-300 ease-in-out border border-PRIMARY w-60 rounded-md text-center p-4 font-semibold"
          onClick={() => {
            setShowAddnewaddressPopup(true);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          {t("Add New Address")}
        </button>
      </div>
      {/* summary */}
      <div
        className={`${
          summaryFixed ? "xl:sticky top-2 right-10" : "static"
        } xl:w-3/12 lg:w-1/3 md:w-1/2 w-full space-y-3 bg-BACKGROUNDGRAY text-BLACK p-3 border border-gray-300 ml-auto`}
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
            {shipphingMethod === "pickup" ? "$ 0.00" : "$ 10.00"}
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
          className="font-semibold bg-PRIMARY text-white hover:bg-white hover:text-PRIMARY border border-PRIMARY duration-300 ease-in-out w-full p-3 text-center"
          onClick={() => handlechangeActiveComponent()}
        >
          {t("Continue")}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
