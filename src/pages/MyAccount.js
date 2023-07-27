import React, { useState } from "react";
import { Helmet } from "react-helmet";
import OrderHIstory from "../components/MyAccount/OrderHIstory";
import Profile from "../components/MyAccount/Profile";
import Address from "../components/MyAccount/Address";
import ChangePassword from "../components/MyAccount/ChangePassword";
import IncompleteOrders from "../components/MyAccount/IncompleteOrders";
import { handleLogoutReducer } from "../redux/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { handleLogout } from "../redux/GlobalStates";
import { useEffect } from "react";
import {
  handleGetAddresses,
  handleGetUserProfile,
} from "../redux/GetContentSlice";
import { useTranslation } from "react-i18next";
import { handleGetOrders } from "../redux/OrderSlice";

const MyAccount = () => {
  const [activeComponent, setActiveComponent] = useState("order_history");

  const { token } = useSelector((state) => state.Auth);

  const dispatch = useDispatch();

  const { t } = useTranslation();

  useEffect(() => {
    dispatch(handleGetAddresses({ token }));
    dispatch(handleGetUserProfile({ token }));
    dispatch(handleGetOrders({ token }));
  }, []);
  return (
    <>
      <Helmet title={t("my_account")} />
      <section className="bg-BACKGROUNDGRAY space-y-5">
        <div className="w-full container mx-auto space_for_div space-y-5">
          <h1 className="font-semibold text-left md:text-4xl text-2xl block py-1">
            {t("my_account")}
          </h1>
          <div className="flex lg:flex-row flex-col items-start justify-start lg:gap-x-4 gap-y-5 min-h-screen lg:pb-40 pb-20">
            {/* left side div */}
            <div className="lg:w-1/4 lg:sticky top-0 w-full border border-BORDERGRAY p-3 bg-white space-y-3">
              <p className="font-semibold md:text-2xl text-lg text-left pb-2">
                {t("Navigation")}
              </p>
              
              {/* <p
                role="button"
                className={`md:text-lg text-base relative group ${
                  activeComponent === "incomplete_orders"
                    ? "font-semibold text-black"
                    : "font-normal text-TEXTGRAY"
                }`}
                onClick={() => setActiveComponent("incomplete_orders")}
              >
                {t("Incomplete Orders")}
                {activeComponent === "incomplete_orders" && (
                  <span className="h-full w-1 bg-PRIMARY absolute top-0 -left-3"></span>
                )}
              </p> */}
              <p
                role="button"
                className={`md:text-lg text-base relative group ${
                  activeComponent === "order_history"
                    ? "font-semibold text-black"
                    : "font-normal text-TEXTGRAY"
                }`}
                onClick={() => setActiveComponent("order_history")}
              >
                {t("Order history")}
                {activeComponent === "order_history" && (
                  <span className="h-full w-1 bg-PRIMARY absolute top-0 -left-3"></span>
                )}
              </p>
              <p
                role="button"
                className={`md:text-lg text-base relative group ${
                  activeComponent === "profile"
                    ? "font-semibold text-black"
                    : "font-normal text-TEXTGRAY"
                }`}
                onClick={() => setActiveComponent("profile")}
              >
                {t("Profile")}
                {activeComponent === "profile" && (
                  <span className="h-full w-1 bg-PRIMARY absolute top-0 -left-3"></span>
                )}{" "}
              </p>
              <p
                role="button"
                className={`md:text-lg text-base relative group ${
                  activeComponent === "address"
                    ? "font-semibold text-black"
                    : "font-normal text-TEXTGRAY"
                }`}
                onClick={() => setActiveComponent("address")}
              >
                {t("Address")}
                {activeComponent === "address" && (
                  <span className="h-full w-1 bg-PRIMARY absolute top-0 -left-3"></span>
                )}{" "}
              </p>
              <p
                role="button"
                className={`md:text-lg text-base relative group ${
                  activeComponent === "change_password"
                    ? "font-semibold text-black"
                    : "font-normal text-TEXTGRAY"
                }`}
                onClick={() => setActiveComponent("change_password")}
              >
                {t("Change password")}
                {activeComponent === "change_password" && (
                  <span className="h-full w-1 bg-PRIMARY absolute top-0 -left-3"></span>
                )}{" "}
              </p>
              <hr />
              <button
                type="button"
                className="text-red-500 text-left font-semibold"
                onClick={() => {
                  dispatch(handleLogoutReducer());
                  dispatch(handleLogout());
                }}
              >
                {t("Logout")}
              </button>
            </div>
            {/* right side div */}
            <div className="lg:w-3/4 w-full">
              {activeComponent === "incomplete_orders" && <IncompleteOrders />}
              {activeComponent === "order_history" && <OrderHIstory />}
              {activeComponent === "profile" && <Profile />}
              {activeComponent === "address" && <Address />}
              {activeComponent === "change_password" && <ChangePassword />}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MyAccount;
