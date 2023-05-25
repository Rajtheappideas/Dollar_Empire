import React, { useState } from "react";
import SingleOrderHistory from "./SingleOrderHistory";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { useTranslation } from "react-i18next";

const OrderHIstory = () => {
  const [showSingleOrder, setShowSingleOrder] = useState(false);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [orderId, setOrderId] = useState(null);

  const { t } = useTranslation();
  const { orders, loading } = useSelector((state) => state.orders);
  useEffect(() => {
    if (orders.length > 0 && !loading) {
      const findOrders = orders.filter(
        (order) => order?.status === "Completed"
      );
      setCompletedOrders(findOrders);
    }
  }, [loading, orders]);

  return (
    <div className="w-full xl:overflow-auto overflow-x-scroll">
      {showSingleOrder ? (
        <SingleOrderHistory
          orderId={orderId}
          setShowSingleOrder={setShowSingleOrder}
          setOrderId={setOrderId}
        />
      ) : loading ? (
        <p className="text-center w-full mx-auto font-semibold text-2xl">
          {t("Fetching Orders")}...
        </p>
      ) : (
        <table className="w-full table-auto overflow-x-scroll">
          <thead>
            <tr className="w-full bg-PRIMARY text-white font-normal">
              <th className="text-center p-3">{t("Order no")}.</th>
              {/* <th className="text-center p-3">Type</th> */}
              <th className="text-center p-3">{t("Order date")}</th>
              <th className="text-center p-3">{t("Items")}</th>
              <th className="text-center p-3">{t("Quantity")}</th>
              <th className="text-center p-3">{t("Amount")}</th>
              <th className="text-center p-3">{t("Tax")}</th>
              <th className="text-center p-3">{t("Total")}</th>
            </tr>
          </thead>
          <tbody className="bg-white text-BLACK text-base">
            {completedOrders.length > 0 && !loading ? (
              completedOrders.reverse().map((order) => (
                <tr className="text-center" key={order?._id}>
                  <td
                    onClick={() => {
                      setShowSingleOrder(true);
                      setOrderId(order?._id);
                    }}
                    className="px-3 py-5 underline text-PRIMARY font-semibold cursor-pointer"
                  >
                    {order?.orderId}
                  </td>
                  {/* <td className="px-3 py-5 whitespace-nowrap">
                  {order?.items?.map((item) => item?.type)}
                </td> */}
                  <td className="px-3 py-5 whitespace-nowrap">
                    {moment(order?.orderDate).format("LL")}
                  </td>
                  <td className="px-3 py-5 whitespace-nowrap">
                    {order?.items?.length}
                  </td>
                  <td className="px-3 py-5 whitespace-nowrap">
                    {/* {order?.items?.reduce((acc, curr) => {
                    return acc + curr?.quantity;
                  }, 0)} */}
                    {order?.totalQuantity}
                  </td>
                  <td className="px-3 py-5 whitespace-nowrap">
                    ${order?.total}
                  </td>
                  <td className="px-3 py-5 whitespace-nowrap">$0</td>
                  <td className="px-3 py-5 whitespace-nowrap">
                    ${order?.total}
                  </td>
                </tr>
              ))
            ) : (
              <>
                <tr>
                  <td
                    colSpan="100%"
                    className="text-center font-semibold text-xl p-2"
                  >
                    {t("No orders yet")}.{" "}
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
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderHIstory;
