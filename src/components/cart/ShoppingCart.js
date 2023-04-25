import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { handleChangeActiveComponent } from "../../redux/GlobalStates";

const ShoppingCart = ({}) => {
  const [showChangeField, setShowChangeField] = useState(false);

  const dispatch = useDispatch();

  return (
    <div className="w-full flex xl:flex-row flex-col items-start justify-start gap-4 pb-10">
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
            <tr className="bg-white font-normal text-BLACK text-left">
              <td className="flex items-center gap-x-3 lg:p-5 p-3">
                <img
                  src={require("../../assets/images/product-3.png")}
                  alt="product"
                  className="min-w-[6rem] min-h-[6rem] max-w-[6rem] max-h-[6rem] object-contain object-center"
                />
                <p className="font-semibold md:text-lg text-left">
                  Medium Waterfall Incense Cone Holder with 20 Incense Cones{" "}
                </p>
              </td>
              <td className="lg:p-5 p-3">#123456</td>
              <td className="lg:p-5 p-3">$2.30</td>
              <td className="whitespace-nowrap lg:p-5 p-3">
                192 <span className="text-PRIMARY underline ml-1">Change</span>
              </td>
              <td className="lg:p-5 p-3">$441.60</td>
              <td className="lg:p-5 p-3">
                <AiOutlineClose
                  role="button"
                  className="h-6 w-6 mx-auto"
                  color="red"
                />
              </td>
            </tr>
            <tr className="bg-white font-normal text-BLACK text-left">
              <td className="flex items-center gap-x-3 lg:p-5 p-3">
                <img
                  src={require("../../assets/images/product-4.png")}
                  alt="product"
                  className="min-w-[6rem] min-h-[6rem] max-w-[6rem] max-h-[6rem] object-contain object-center"
                />
                <p className="font-semibold md:text-lg text-left">
                  Nose and ear portable Trimmer
                </p>
              </td>
              <td className="lg:p-5 p-3">#123456</td>
              <td className="lg:p-5 p-3">$2.30</td>
              <td className="whitespace-nowrap lg:p-5 p-3">
                {!showChangeField ? (
                  192
                ) : (
                  <input
                    type="number"
                    className="bg-gray-300 text-black placeholder:text-BLACK h-10 rounded-md w-16 p-1"
                    placeholder="192"
                  />
                )}
                {showChangeField ? (
                  <span
                    role="button"
                    className="text-PRIMARY underline ml-1"
                    onClick={() => setShowChangeField(false)}
                  >
                    Update
                  </span>
                ) : (
                  <span
                    role="button"
                    className="text-PRIMARY underline ml-1"
                    onClick={() => setShowChangeField(true)}
                  >
                    Change
                  </span>
                )}
              </td>
              <td className="lg:p-5 p-3">$441.60</td>
              <td className="lg:p-5 p-3">
                <AiOutlineClose
                  role="button"
                  className="h-6 w-6 mx-auto"
                  color="red"
                />
              </td>
            </tr>
            <tr className="bg-white font-normal text-BLACK text-left">
              <td className="flex items-center gap-x-3 lg:p-5 p-3">
                <img
                  src={require("../../assets/images/product-3.png")}
                  alt="product"
                  className="min-w-[6rem] min-h-[6rem] max-w-[6rem] max-h-[6rem] object-contain object-center"
                />
                <p className="font-semibold md:text-lg text-left">
                  Medium Waterfall Incense Cone Holder with 20 Incense Cones{" "}
                </p>
              </td>
              <td className="lg:p-5 p-3">#123456</td>
              <td className="lg:p-5 p-3">$2.30</td>
              <td className="whitespace-nowrap lg:p-5 p-3">
                192 <span className="text-PRIMARY underline ml-1">Change</span>
              </td>
              <td className="lg:p-5 p-3">$441.60</td>
              <td className="lg:p-5 p-3">
                <AiOutlineClose
                  role="button"
                  className="h-6 w-6 mx-auto"
                  color="red"
                />
              </td>
            </tr>
            <tr className="bg-white font-normal text-BLACK text-left">
              <td className="flex items-center gap-x-3 lg:p-5 p-3">
                <img
                  src={require("../../assets/images/product-4.png")}
                  alt="product"
                  className="min-w-[6rem] min-h-[6rem] max-w-[6rem] max-h-[6rem] object-contain object-center"
                />
                <p className="font-semibold md:text-lg text-left">
                  Medium Waterfall Incense Cone Holder with 20 Incense Cones{" "}
                </p>
              </td>
              <td className="lg:p-5 p-3">#123456</td>
              <td className="lg:p-5 p-3">$2.30</td>
              <td className="whitespace-nowrap lg:p-5 p-3">
                192 <span className="text-PRIMARY underline ml-1">Change</span>
              </td>
              <td className="lg:p-5 p-3">$441.60</td>
              <td className="lg:p-5 p-3">
                <AiOutlineClose
                  role="button"
                  className="h-6 w-6 mx-auto"
                  color="red"
                />
              </td>
            </tr>
          </tbody>
        </table>
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
          onClick={() => dispatch(handleChangeActiveComponent("Check_Out"))}
          className="font-semibold bg-PRIMARY text-white hover:bg-white hover:text-PRIMARY border border-PRIMARY duration-300 ease-in-out w-full p-3 text-center"
        >
          Proceed to checkout
        </button>
        <p>
          <Link
            to="/product-listing"
            state={{ title: "", price: null, searchQuery: "" }}
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
