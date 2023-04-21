import React from "react";
import success from "../../assets/animations/success.json";
import Lottie from "react-lottie";
import { Link } from "react-router-dom";

const SuccessOrder = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: success,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="flex w-full items-center justify-center gap-5 flex-col">
      <Lottie
        options={defaultOptions}
        height={300}
        width={300}
        isClickToPauseDisabled={true}
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
