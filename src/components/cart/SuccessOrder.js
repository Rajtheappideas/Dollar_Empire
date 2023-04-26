import React from "react";
import success from "../../assets/animations/success.json";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";

const SuccessOrder = () => {
  return (
    <div className="flex w-full items-center justify-center gap-5 flex-col py-10">
      <Lottie
        animationData={success}
        style={{ pointerEvents: "none", width: "300px", height: "300px" }}
      />
      <p className="font-bold text-2xl">Thank you for purchase !</p>
      <p className="font-semibold text-lg">Your order id : 123456789</p>
      <Link to="/my-account">
        <button
          type="button"
          className="font-semibold border border-PRIMARY bg-PRIMARY text-white hover:bg-white hover:text-PRIMARY w-48 text-center p-4 rounded-md"
        >
          My Orders
        </button>
      </Link>
    </div>
  );
};

export default SuccessOrder;
