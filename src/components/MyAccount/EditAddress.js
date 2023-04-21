import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const EditAddress = ({ setShowEditAddres }) => {
  return (
    <div className="bg-white border border-BORDERGRAY space-y-5 p-5 w-full">
      {/* name */}
      <div className="flex items-start w-full gap-x-3">
        <div className="lg:w-2/5 w-1/2">
          <label className="text-black font-medium block text-left text-lg">
            First name
          </label>
          <input
            type="text"
            className="bg-LIGHTGRAY w-full text-black placeholder:text-gray-400 rounded-md p-3"
            placeholder="First name"
          />
        </div>
        <div className="lg:w-2/5 w-1/2">
          <label className="text-black font-medium block text-left text-lg">
            Last name
          </label>
          <input
            type="text"
            className="bg-LIGHTGRAY w-full text-black placeholder:text-gray-400 rounded-md p-3"
            placeholder="Last name"
          />
        </div>
      </div>
      {/* company name */}
      <>
        <label className="text-black font-medium block text-left text-lg">
          Company name
        </label>
        <input
          type="text"
          className="bg-LIGHTGRAY lg:w-[82%] w-full text-black placeholder:text-gray-400 rounded-md p-3"
          placeholder="Company name"
        />
      </>
      {/* location */}
      <>
        <label className="text-black font-medium block text-left text-lg">
          Location
        </label>
        <input
          type="text"
          className="bg-LIGHTGRAY lg:w-[82%] w-full text-black placeholder:text-gray-400 rounded-md p-3"
          placeholder="Location"
        />
      </>
      {/* city */}
      <>
        <label className="text-black font-medium block text-left text-lg">
          City
        </label>
        <input
          type="text"
          className="bg-LIGHTGRAY lg:w-[82%] w-full text-black placeholder:text-gray-400 rounded-md p-3"
          placeholder="City"
        />
      </>
      {/* Country */}
      <>
        <label className="text-black font-medium block text-left text-lg">
          Country
        </label>
        <input
          type="text"
          className="bg-LIGHTGRAY lg:w-[82%] w-full text-black placeholder:text-gray-400 rounded-md p-3"
          placeholder="Country"
        />
      </>
      {/* phone, postal code */}
      <div className="flex items-start w-full gap-x-3">
        <div className="lg:w-2/5 w-full">
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
        <div className="lg:w-2/5 w-full">
          <label className="text-black font-medium block text-left text-lg">
            Postal Code*
          </label>
          <input
            type="tel"
            className="bg-LIGHTGRAY w-full text-black placeholder:text-gray-400 rounded-md p-3"
            placeholder="Postal code"
          />
        </div>
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
          className="w-40 font-semibold bg-gray-200 text-black rounded-md text-center p-3 active:translate-y-2 hover:text-white hover:bg-black border border-gray-400 duration-300"
          onClick={() => setShowEditAddres(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditAddress;
