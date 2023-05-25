import React from "react";
import { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { handleGetOrderbyId } from "../../redux/OrderSlice";
import moment from "moment";
import BaseUrl from "../../BaseUrl";
import { useTranslation } from "react-i18next";

const SingleOrderHistory = ({ setShowSingleOrder, orderId, setOrderId }) => {
  const { token } = useSelector((state) => state.Auth);
  const { singleOrder, loading } = useSelector((state) => state.orders);

  const dispatch = useDispatch();

  const { t } = useTranslation();

  useEffect(() => {
    dispatch(handleGetOrderbyId({ token, id: orderId }));
  }, []);
  return (
    <>
      {loading ? (
        <p className="text-2xl text-center mx-auto font-semibold">
          {t("Fetching Details")}...
        </p>
      ) : (
        <div className="w-full relative z-0 bg-white border border-BORDERGRAY text-BLACK space-y-10">
          <div className="p-5 md:space-y-5 space-y-3 overflow-x-hidden">
            <p className="font-semibold md:text-3xl text-lg text-PRIMARY">
              {t("Order ID")} : {singleOrder?.orderId}
            </p>
            <p className="flex items-center w-full text-lg">
              <span className="font-bold md:w-60 w-40">{t("Shipping method")}:</span>{" "}
              <span className="font-normal">{singleOrder?.shippingMethod}</span>
            </p>
            <p className="flex items-center w-full text-lg">
              <span className="font-bold md:w-60 w-40">{t("Order date")}:</span>{" "}
              <span className="font-normal">
                {moment(singleOrder?.orderDate).format("lll")}
              </span>
            </p>
            <p className="flex items-center w-full text-lg">
              <span className="font-bold md:w-60 w-40">{t("Items")}:</span>{" "}
              <span className="font-normal">{singleOrder?.items.length}</span>
            </p>
            <p className="flex items-center w-full text-lg">
              <span className="font-bold md:w-60 w-40">{t("Quantity")}:</span>{" "}
              <span className="font-normal">{singleOrder?.totalQuantity}</span>
            </p>
            <p className="flex items-center w-full text-lg">
              <span className="font-bold md:w-60 w-40">{t("Total")}:</span>{" "}
              <span className="font-normal">${singleOrder?.total}</span>
            </p>
          </div>
          {/* products */}
          <div className="w-full overflow-x-scroll">
            <table className="w-full table-auto">
              <thead>
                <tr className=" bg-PRIMARY text-white w-full">
                  <th className="p-3 text-left min-w-[20rem]">{t("Product")}</th>
                  <th className="p-3 text-center min-w-[8rem]">{t("Item no")}.</th>
                  <th className="p-3 text-center w-28">{t("Price")}</th>
                  <th className="p-3 text-center w-28">{t("Quantity")}</th>
                  <th className="p-3 text-center w-28">{t("Subtotal")}</th>
                </tr>
              </thead>
              <tbody>
                {singleOrder?.items.map((product) => (
                  <tr className="text-center" key={product?._id}>
                    <td className="p-3 flex gap-x-3 whitespace-normal items-center">
                      <img
                        src={BaseUrl.concat(product?.product?.images[0])}
                        alt={product?.product?.name}
                        className="min-w-[6rem] min-h-[6rem] max-w-[6rem] max-h-[6rem] object-contain object-center"
                      />
                      <span className="font-semibold text-left">
                        {product?.product?.name}
                      </span>
                    </td>
                    <td className="p-3">#{product?.product?.number}</td>
                    <td className="p-3">${product?.product?.price}</td>
                    <td className="p-3">{product?.quantity}</td>
                    <td className="p-3">
                      $
                      {parseFloat(
                        product?.product?.price * product?.quantity
                      ).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <AiOutlineClose
            role="button"
            onClick={() => {
              setShowSingleOrder(false);
              setOrderId(null);
            }}
            className="h-6 w-6 absolute -top-5 right-2 z-10 text-black"
          />
        </div>
      )}
    </>
  );
};

export default SingleOrderHistory;
