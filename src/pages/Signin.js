import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const Signin = () => {
  return (
    <>
      <Helmet title="Sign-in" />
      <div className="p-4 mx-auto xl:w-2/5 lg:w-1/2 md:w-2/3 w-11/12 h-auto space-y-4 md:my-14 my-7 rounded-lg border border-BORDERGRAY">
        <h1 className="font-semibold md:text-3xl text-xl text-left">
          Customer Login
        </h1>
        <hr />
        <label className="text-black font-medium block text-left text-lg">
          Email address
        </label>
        <input
          type="email"
          className="bg-LIGHTGRAY w-full text-black placeholder:text-gray-400 rounded-md p-3"
          placeholder="Email"
        />
        <label className="text-black font-medium block text-left text-lg">
          Password
        </label>
        <input
          type="password"
          className="bg-LIGHTGRAY w-full text-black placeholder:text-gray-400 rounded-md p-3"
          placeholder="Password"
        />
        <p>
          <Link
            to="/forgot-password"
            className="font-medium text-lg inline-block"
          >
            Forgot your password?
          </Link>
        </p>
        <button
          type="button"
          className="bg-PRIMARY active:translate-y-2 hover:text-PRIMARY hover:bg-white border border-PRIMARY duration-300 p-3 text-white text-center w-40 rounded-md uppercase font-bold"
        >
          login
        </button>

        <p className="font-semibold text-center text-lg py-5">
          New customer?{" "}
          <Link
            to="/sign-up"
            className="underline text-blue-400
        "
          >
            Create new account
          </Link>
        </p>
      </div>
    </>
  );
};

export default Signin;
