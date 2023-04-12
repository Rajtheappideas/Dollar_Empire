import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const SingleOrderHistory = ({ setShowSingleOrder }) => {
  return (
    <div className="w-full overflow-x-scroll relative z-0 bg-white border border-BORDERGRAY text-BLACK space-y-10">
      <div className="p-5 md:space-y-5 space-y-3 overflow-x-hidden">
        <p className="font-semibold md:text-3xl text-lg text-PRIMARY">
          Order ID : 123456789
        </p>
        <p className="flex items-center w-full text-lg">
          <span className="font-bold md:w-60 w-40">Shipping method:</span>{" "}
          <span className="font-normal">Pickup</span>
        </p>
        <p className="flex items-center w-full text-lg">
          <span className="font-bold md:w-60 w-40">Order date:</span>{" "}
          <span className="font-normal">20/11/2023 3:52:53 AM</span>
        </p>
        <p className="flex items-center w-full text-lg">
          <span className="font-bold md:w-60 w-40">Items:</span>{" "}
          <span className="font-normal">4</span>
        </p>
        <p className="flex items-center w-full text-lg">
          <span className="font-bold md:w-60 w-40">Quantity:</span>{" "}
          <span className="font-normal">152</span>
        </p>
        <p className="flex items-center w-full text-lg">
          <span className="font-bold md:w-60 w-40">Total:</span>{" "}
          <span className="font-normal">$441.60</span>
        </p>
      </div>
      <table className="w-full table-auto overflow-x-scroll">
        <thead>
          <tr className=" bg-PRIMARY text-white w-full">
            <th className="p-3 text-left">Product</th>
            <th className="p-3 text-center">Item no.</th>
            <th className="p-3 text-center">Price</th>
            <th className="p-3 text-center">Quantity</th>
            <th className="p-3 text-center">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-center">
            <td className="py-5 px-3 flex gap-x-3 whitespace-normal md:w-fit w-60 items-center">
              <img
                src={require("../../assets/images/trimmer.png")}
                alt="trimmer"
                className="h-20 w-20 object-contain object-center"
              />
              <span className="font-semibold text-left">
                Nose and ear portable Trimmer
              </span>
            </td>
            <td className="py-5 px-3">#123456</td>
            <td className="py-5 px-3">$2.30</td>
            <td className="py-5 px-3">192</td>
            <td className="py-5 px-3">$441.60</td>
          </tr>
          <tr className="text-center">
            <td className="py-5 px-3 flex gap-x-3 whitespace-normal md:w-fit w-60 items-center">
              <img
                src={require("../../assets/images/trimmer.png")}
                alt="trimmer"
                className="h-20 w-20 object-contain object-center"
              />
              <span className="font-semibold text-left">
                Nose and ear portable Trimmer
              </span>
            </td>
            <td className="py-5 px-3">#123456</td>
            <td className="py-5 px-3">$2.30</td>
            <td className="py-5 px-3">192</td>
            <td className="py-5 px-3">$441.60</td>
          </tr>
          <tr className="text-center">
            <td className="py-5 px-3 flex gap-x-3 whitespace-normal md:w-fit w-60 items-center">
              <img
                src={require("../../assets/images/trimmer.png")}
                alt="trimmer"
                className="h-20 w-20 object-contain object-center"
              />
              <span className="font-semibold text-left">
                Nose and ear portable Trimmer
              </span>
            </td>
            <td className="py-5 px-3">#123456</td>
            <td className="py-5 px-3">$2.30</td>
            <td className="py-5 px-3">192</td>
            <td className="py-5 px-3">$441.60</td>
          </tr>
          <tr className="text-center">
            <td className="py-5 px-3 flex gap-x-3 whitespace-normal md:w-fit w-60 items-center">
              <img
                src={require("../../assets/images/trimmer.png")}
                alt="trimmer"
                className="h-20 w-20 object-contain object-center"
              />
              <span className="font-semibold text-left">
                Nose and ear portable Trimmer
              </span>
            </td>
            <td className="py-5 px-3">#123456</td>
            <td className="py-5 px-3">$2.30</td>
            <td className="py-5 px-3">192</td>
            <td className="py-5 px-3">$441.60</td>
          </tr>
        </tbody>
      </table>
      <AiOutlineClose
        role="button"
        onClick={() => setShowSingleOrder(false)}
        className="h-6 w-6 absolute -top-5 right-2 z-10 text-black"
      />
    </div>
  );
};

export default SingleOrderHistory;
