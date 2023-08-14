import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const ScrollToTop = () => {
  const [showButton, setShowButton] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 300 ? setShowButton(true) : setShowButton(false);
    });

    return () => window.removeEventListener("scroll", () => {});
  }, [window.scrollY]);

  return (
    <div
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed z-0 transition ease-in-out active:scale-90 duration-100 bottom-5 right-5  font-semibold md:leading-[48px] leading-10 bg-black text-white text-center md:w-40 w-32 md:h-12 h-10 rounded-lg ${
        showButton ? "scale-100" : "scale-0"
      }`}
      role="button"
    >
      Go To Top
    </div>
  );
};

export default ScrollToTop;
