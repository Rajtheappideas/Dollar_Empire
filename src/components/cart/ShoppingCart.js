import React, { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { handleChangeActiveComponent } from "../../redux/GlobalStates";
import BaseUrl from "../../BaseUrl";
import {
  handleAddProductToCart,
  handleDecreaseQuantityAndAmount,
  handleDeleteQuantity,
  handleRemoveProductToCart,
  handleUpdateTotalQuantity,
  handleUpdateTotalQuantityAndAmount,
} from "../../redux/CartSlice";
import { toast } from "react-hot-toast";

const ShoppingCart = ({ summaryFixed }) => {
  const [showChangeField, setShowChangeField] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [productQuantity, setProductQuantity] = useState(0);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [productId, setProductId] = useState(null);

  const { grandTotal, subTotal, cartItems, loading } = useSelector(
    (state) => state.cart
  );
  const { token } = useSelector((state) => state.Auth);
  const { productListingPageLink } = useSelector((state) => state.globalStates);

  const dispatch = useDispatch();

  const AbortControllerRef = useRef(null);

  useEffect(() => {
    return () => {
      AbortControllerRef.current !== null && AbortControllerRef.current.abort();
    };
  }, []);

  const handleRemoveFromCart = (id, quantity, amount) => {
    setDeleteLoading(true);
    const response = dispatch(
      handleRemoveProductToCart({ token, id, signal: AbortControllerRef })
    );
    if (response) {
      response
        .then((res) => {
          dispatch(handleDecreaseQuantityAndAmount({ quantity, amount }));
          setDeleteLoading(false);
        })
        .catch((err) => {
          setDeleteLoading(false);
          toast.error("Someting went worng, Try again!!!");
        });
    }
  };

  const handleAddProduct = (id, title, type, amount) => {
    console.log(amount);
    toast.dismiss();
    setUpdateLoading(true);
    const response = dispatch(
      handleAddProductToCart({
        token,
        id,
        signal: AbortControllerRef,
        type: type,
        quantity: productQuantity,
      })
    );
    if (response) {
      response
        .then((res) => {
          if (res.payload.status === "success") {
            toast.success(`${title}'s quantity updated.`);
            setUpdateLoading(false);
            setShowChangeField(false);
            dispatch(
              handleUpdateTotalQuantityAndAmount({
                quantity: productQuantity > 0 ? productQuantity : 0,
                amount,
              })
            );
            setProductId(null);
          }
        })
        .catch((err) => {
          toast.error(err.payload.message);
          console.log(err);
          setUpdateLoading(false);
        });
    }
  };

  return (
    <div className="relative w-full flex xl:flex-row flex-col items-start justify-start gap-4 pb-10 max-h-fit">
      {/* table */}
      <div className="xl:w-9/12 w-full xl:overflow-hidden overflow-x-scroll scrollbar">
        <table className="w-full">
          <thead className="bg-PRIMARY text-white p-2 w-full">
            <tr>
              <th className="lg:min-w-[20rem] min-w-[23rem] lg:p-3 p-2 font-semibold text-left text-base">
                Product
              </th>
              <th className="lg:w-32 min-w-[8rem] lg:p-3 p-2 font-semibold text-left text-base">
                Item Number
              </th>
              <th className="lg:w-28 min-w-[7rem] lg:p-3 p-2 font-semibold text-left text-base">
                Unit Price
              </th>
              <th className="lg:w-28 min-w-[10rem] lg:p-3 p-2 font-semibold text-left text-base">
                Quantity
              </th>
              <th className="lg:w-28 min-w-[5rem] lg:p-3 p-2 font-semibold text-left text-base">
                Subtotal
              </th>
              <th className="lg:w-28 min-w-[3rem] lg:p-3 p-2 font-semibold text-cneter text-base">
                Remove
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan="100%"
                  className="text-center font-semibold text-xl p-2"
                >
                  Loading...
                </td>
              </tr>
            ) : cartItems.length <= 0 ? (
              <>
                <tr>
                  <td
                    colSpan="100%"
                    className="text-center font-semibold text-xl p-2"
                  >
                    No items in cart.
                  </td>
                </tr>
                <tr>
                  <td colSpan="100%" className="text-center mx-auto py-3">
                    <Link to="/product-listing/all-products">
                      <button
                        type="button"
                        className="font-semibold mx-auto w-60 bg-PRIMARY text-white hover:bg-white hover:text-PRIMARY border border-PRIMARY duration-300 ease-in-out p-3 text-center"
                      >
                        Go to products
                      </button>
                    </Link>
                  </td>
                </tr>
              </>
            ) : (
              cartItems.map((item) => (
                <tr
                  key={item?._id}
                  className="bg-white font-normal text-BLACK text-left"
                >
                  <td className="flex items-center gap-x-3 lg:p-5 p-3">
                    <img
                      src={BaseUrl.concat(item?.product?.images[0])}
                      alt={item?.product?.name}
                      className="min-w-[6rem] min-h-[6rem] max-w-[6rem] max-h-[6rem] object-contain object-center"
                    />
                    <p className="font-semibold md:text-lg text-left">
                      {item?.product?.name}
                    </p>
                  </td>
                  <td className="lg:p-5 p-3">#{item?.product?.number}</td>
                  <td className="lg:p-5 p-3">${item?.product?.price}</td>
                  <td className="whitespace-nowrap lg:p-5 p-3">
                    {productId !== item?.product?._id ? (
                      item.quantity
                    ) : (
                      <input
                        type="number"
                        className="bg-gray-300 outline-none text-black placeholder:text-BLACK h-10 rounded-md w-16 p-1"
                        value={productQuantity}
                        onChange={(e) => setProductQuantity(e.target.value)}
                      />
                    )}
                    {showChangeField && productId === item?.product?._id ? (
                      <span
                        role="button"
                        className="text-PRIMARY underline ml-1"
                        onClick={() =>
                          handleAddProduct(
                            item?.product?._id,
                            item?.product?.name,
                            item.type,
                            item?.product?.price * productQuantity
                          )
                        }
                      >
                        Update
                      </span>
                    ) : (
                      <span
                        role="button"
                        className="text-PRIMARY underline ml-1"
                        onClick={() => {
                          setShowChangeField(true);
                          setProductQuantity(item?.quantity);
                          setProductId(item?.product?._id);
                        }}
                      >
                        Change
                      </span>
                    )}
                  </td>
                  <td className="lg:p-5 p-3">
                    ${(item?.product?.price * item?.quantity).toFixed(2)}
                  </td>
                  <td className="lg:p-5 p-3">
                    {deleteLoading ? (
                      "..."
                    ) : (
                      <AiOutlineClose
                        role="button"
                        className="h-6 w-6 mx-auto"
                        color="red"
                        onClick={() =>
                          handleRemoveFromCart(
                            item?.product?._id,
                            item?.quantity,
                            item?.product?.price * item?.quantity
                          )
                        }
                      />
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* summary */}
      <div
        className={`xl:w-3/12 md:w-1/2 w-full space-y-3 bg-BACKGROUNDGRAY text-BLACK p-3 border border-gray-300 ml-auto ${
          summaryFixed ? "xl:sticky top-2 right-10" : "static"
        }`}
      >
        <p className="font-semibold text-xl">Order Summary</p>
        <hr className="w-full" />
        <p className="w-full flex items-center justify-between text-base">
          <span className="font-normal">Subtotal</span>
          <span className="ml-auto font-semibold text-base">
            ${parseFloat(grandTotal).toFixed(2)}{" "}
          </span>
        </p>
        <p className="w-full flex items-center justify-between text-base">
          <span className="font-normal">Freight</span>
          <span className="ml-auto font-semibold text-base">$10.00</span>
        </p>
        <hr className="w-full" />
        <p className="w-full flex items-center justify-between text-2xl font-bold">
          <span>Grand Total</span>
          <span className="ml-auto">${parseFloat(grandTotal).toFixed(2)}</span>
        </p>
        <hr className="w-full" />
        <button
          type="button"
          onClick={() => dispatch(handleChangeActiveComponent("Check_Out"))}
          className="font-semibold bg-PRIMARY text-white hover:bg-white hover:text-PRIMARY border border-PRIMARY duration-300 ease-in-out w-full p-3 text-center"
        >
          Proceed to checkout
        </button>
        <p>
          <Link
            to={productListingPageLink}
            state={{ title: "all-products", price: null, searchQuery: "" }}
          >
            <button
              type="button"
              className="font-semibold bg-black text-white hover:bg-white hover:text-black border border-black duration-300 ease-in-out w-full p-3 text-center"
            >
              Continue to shopping
            </button>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ShoppingCart;
