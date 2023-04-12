import React from "react";
import { Helmet } from "react-helmet";

const ForgotPassword = () => {
  return (
    <>
      <Helmet title="Forgot-password" />
      <div className="p-4 mx-auto xl:w-2/5 lg:w-1/2 md:w-2/3 w-11/12 h-auto space-y-4 md:my-14 my-7 rounded-lg border border-BORDERGRAY">
        <h1 className="font-semibold md:text-3xl text-xl text-left">
          Forgot Password
        </h1>
        <hr />
        <p className="font-medium">
          Enter your email address to reset your account password.
        </p>
        <label className="text-black font-medium block text-left text-lg">
          Email*
        </label>
        <input
          type="email"
          className="bg-LIGHTGRAY w-full text-black placeholder:text-gray-400 rounded-md p-3"
          placeholder="Email"
          required
        />
        <button
          type="button"
          className="bg-PRIMARY hover:text-PRIMARY hover:bg-white border border-PRIMARY duration-500 p-3 text-white text-center w-40 rounded-md uppercase font-bold"
        >
          send
        </button>
      </div>
    </>
  );
};

export default ForgotPassword;
