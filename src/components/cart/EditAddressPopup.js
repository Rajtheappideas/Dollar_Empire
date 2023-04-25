import React, { useState } from "react";
import { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const EditAddressPopup = ({ setShowPopup }) => {
  return (
    <div
      className={`absolute bg-black/30 z-50 w-full lg:min-h-[100rem] min-h-[120rem]  inset-0 backdrop-blur-sm`}
    >
      <div className="fixed overflow-hidden space-y-3 top-10 left-1/2 -translate-x-1/2 z-50 md:p-5 py-10 px-5 bg-white text-black lg:w-5/12 md:w-7/12 w-[95%] h-auto rounded-md">
        <div className="flex items-center justify-between w-full">
          <p className="font-semibold text-2xl">Shipping Address</p>
          <AiOutlineClose
            role="button"
            onClick={() => setShowPopup(false)}
            className="w-7 h-7 text-black"
          />
        </div>
        <hr className="w-full" />
        {/* form */}
        {/* name */}
        <div className="flex items-start w-full gap-x-4">
          <div className=" w-1/2">
            <label className="text-black font-medium block text-left text-lg">
              First name*
            </label>
            <input
              type="text"
              className="bg-LIGHTGRAY w-full text-black placeholder:text-gray-400 rounded-md p-3"
              placeholder="First name"
            />
          </div>
          <div className=" w-1/2">
            <label className="text-black font-medium block text-left text-lg">
              Last name*
            </label>
            <input
              type="text"
              className="bg-LIGHTGRAY w-full text-black placeholder:text-gray-400 rounded-md p-3"
              placeholder="Last name"
            />
          </div>
        </div>{" "}
        {/* company name */}
        <>
          <label className="text-black font-medium block text-left text-lg">
            Company name*
          </label>
          <input
            type="text"
            className="bg-LIGHTGRAY w-full text-black placeholder:text-gray-400 rounded-md p-3"
            placeholder="Company name"
          />
        </>
        {/* location */}
        <>
          <label className="text-black font-medium block text-left text-lg">
            Location*
          </label>
          <input
            type="text"
            className="bg-LIGHTGRAY w-full text-black placeholder:text-gray-400 rounded-md p-3"
            placeholder="Location"
          />
        </>
        {/* city */}
        <>
          <label className="text-black font-medium block text-left text-lg">
            City*
          </label>
          <input
            type="text"
            className="bg-LIGHTGRAY w-full text-black placeholder:text-gray-400 rounded-md p-3"
            placeholder="City"
          />
        </>
        {/* Country */}
        <>
          <label className="text-black font-medium block text-left text-lg">
            Country*
          </label>
          <input
            type="text"
            className="bg-LIGHTGRAY w-full text-black placeholder:text-gray-400 rounded-md p-3"
            placeholder="Country"
          />
        </>
        {/* phone */}
        <div className="w-full">
          <label className="text-black font-medium block text-left text-lg">
            Phone*
          </label>
          <PhoneInput
            country={"us"}
            countryCodeEditable={false}
            enableSearch={true}
            inputProps={{
              name: "phone",
            }}
            inputStyle={{
              width: "100%",
              background: "#F5F5F5",
              borderRadius: "6px",
              border: "0px",
              padding: "1.6rem 0 1.6rem 3rem",
            }}
            dropdownStyle={{ background: "lightgray" }}
            buttonStyle={{ border: "0px" }}
          />
        </div>
        {/* btns */}
        <div className="flex w-full items-center gap-x-3">
          <button
            type="button"
            className="w-40 font-semibold bg-PRIMARY text-white rounded-md text-center p-3 active:translate-y-2 hover:text-PRIMARY hover:bg-white border border-PRIMARY duration-300"
          >
            Save
          </button>
          <button
            type="button"
            className="w-40 font-semibold bg-gray-300 text-black rounded-md text-center p-3 active:translate-y-2 hover:text-white hover:bg-black border border-gray-400 duration-300"
            onClick={() => setShowPopup(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditAddressPopup;
