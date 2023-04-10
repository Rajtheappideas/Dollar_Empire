import React from "react";
import Lottie from "react-lottie";
import Error404 from "../assets/animations/404.json";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Error404,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="flex flex-col items-center justify-center text-center w-full h-screen">
      <Lottie
        options={defaultOptions}
        isClickToPauseDisabled={true}
        style={{
          cursor: "default",
          width: "fit-content",
          height: "fit-content",
        }}
      />
      <Link to="/">
        <button
          type="button"
          className="w-44 h-12 rounded-lg font-bold text-center text-white bg-GREEN"
        >
          Go To Home
        </button>
      </Link>
    </div>
  );
};

export default PageNotFound;
