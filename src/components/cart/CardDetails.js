import React from "react";
import { useDispatch } from "react-redux";

const CardDetails = () => {
  return (
    <div className="xl:w-9/12 w-full space-y-3">
      <p className="bg-PRIMARY text-white p-4 w-full text-left font-semibold tracking-wide">
        Card details
      </p>
      {/* name */}
      <>
        <label className="text-black font-medium block text-left text-lg">
          Name on card*
        </label>
        <input
          type="text"
          className="bg-LIGHTGRAY xl:w-1/2 w-full text-black placeholder:text-gray-400 rounded-md p-3"
          placeholder="Name.."
        />
      </>
      {/* number */}
      <>
        <label className="text-black font-medium block text-left text-lg">
          Card number*
        </label>
        <input
          type="tel"
          className="bg-LIGHTGRAY xl:w-1/2 w-full text-black placeholder:text-gray-400 rounded-md p-3"
          placeholder="Card number.."
        />
      </>
      {/* date */}
      <>
        <label className="text-black font-medium block text-left text-lg">
          Card number*
        </label>
        <input
          type="month"
          className="bg-LIGHTGRAY xl:w-1/2 w-full text-black placeholder:text-gray-400 rounded-md p-3"
          placeholder="Card number.."
        />
      </>
      {/* cvv */}
      <>
        <label className="text-black font-medium block text-left text-lg">
          CVV*
        </label>
        <input
          type="tel"
          className="bg-LIGHTGRAY xl:w-1/2 w-full text-black placeholder:text-gray-400 rounded-md p-3"
          placeholder="***"
        />
      </>
    </div>
  );
};

export default CardDetails;
