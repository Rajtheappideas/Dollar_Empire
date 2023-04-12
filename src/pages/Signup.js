import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  formatPhoneNumberIntl,
  isPossiblePhoneNumber,
  isValidPhoneNumber,
} from "react-phone-number-input";

const Signup = () => {
  return (
    <>
      <Helmet title="Sign-in" />
      <div className="p-4 mx-auto xl:w-2/5 lg:w-1/2 md:w-2/3 w-11/12 h-auto space-y-4 md:my-14 my-7 rounded-lg border border-BORDERGRAY">
        <h1 className="font-semibold md:text-3xl text-xl text-left">
          Customer Register
        </h1>
        <hr />
        {/* first & last name */}
        <div className="flex items-start w-full gap-x-3">
          <div className="w-1/2">
            <label className="text-black font-medium block text-left text-lg">
              First name*
            </label>
            <input
              type="text"
              className="bg-LIGHTGRAY w-full text-black placeholder:text-gray-400 rounded-md p-3"
              placeholder="First name"
            />
          </div>
          <div className="w-1/2">
            <label className="text-black font-medium block text-left text-lg">
              Last name*
            </label>
            <input
              type="text"
              className="bg-LIGHTGRAY w-full text-black placeholder:text-gray-400 rounded-md p-3"
              placeholder="Last name"
            />
          </div>
        </div>
        {/* country */}
        <>
          <label className="text-black font-medium block text-left text-lg">
            Country*
          </label>
          <input
            type="text"
            className="bg-LIGHTGRAY w-full text-black placeholder:text-gray-400 rounded-md p-3"
            placeholder="United states"
          />
        </>
        {/* company name */}
        <>
          <label className="text-black font-medium block text-left text-lg">
            Company name*
          </label>
          <input
            type="text"
            className="bg-LIGHTGRAY w-full text-black placeholder:text-gray-400 rounded-md p-3"
            placeholder="Type here..."
          />
        </>
        {/* address */}
        <>
          <label className="text-black font-medium block text-left text-lg">
            Address*
          </label>
          <input
            type="text"
            className="bg-LIGHTGRAY w-full text-black placeholder:text-gray-400 rounded-md p-3"
            placeholder="Type here..."
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
            placeholder="Type here..."
          />
        </>
        {/* state & postal code */}
        <div className="flex items-start w-full gap-x-3">
          <div className="w-1/2">
            <label className="text-black font-medium block text-left text-lg">
              State*
            </label>
            <input
              type="text"
              className="bg-LIGHTGRAY w-full text-black placeholder:text-gray-400 rounded-md p-3"
              placeholder="Type here..."
            />
          </div>
          <div className="w-1/2">
            <label className="text-black font-medium block text-left text-lg">
              Postal code*
            </label>
            <input
              type="text"
              className="bg-LIGHTGRAY w-full text-black placeholder:text-gray-400 rounded-md p-3"
              placeholder="Type here..."
            />
          </div>
        </div>
        {/* phone */}
        <>
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
        </>
        {/* email */}
        <>
          <label className="text-black font-medium block text-left text-lg">
            Email*
          </label>
          <input
            type="email"
            className="bg-LIGHTGRAY w-full text-black placeholder:text-gray-400 rounded-md p-3"
            placeholder="Email"
          />
        </>
        {/*password  */}
        <>
          <label className="text-black font-medium block text-left text-lg">
            Password
          </label>
          <input
            type="password"
            className="bg-LIGHTGRAY w-full text-black placeholder:text-gray-400 rounded-md p-3"
            placeholder="Password"
          />
        </>
        {/* checkbox */}
        <p className="flex items-start gap-x-2">
          <input
            type="checkbox"
            className="w-8 h-8 rounded-md border inline-block mt-1"
          />
          <span>
            Accept Lorem Ipsum is simply dummy text of the printing and type
            lorem is setting industry.
          </span>
        </p>
        {/* btn */}
        <button
          type="button"
          className="bg-PRIMARY hover:text-PRIMARY hover:bg-white border border-PRIMARY duration-500 p-3 text-white text-center w-40 rounded-md font-semibold"
        >
          Register
        </button>

        {/* btn signin */}
        <p className="font-semibold text-center text-lg py-5">
          Already have an account?&nbsp;
          <Link to="/sign-in" className="underline text-blue-400">
            Login
          </Link>
        </p>
      </div>
    </>
  );
};

export default Signup;
