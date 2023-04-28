import React from "react";
import { MdLocationOn, MdCall } from "react-icons/md";
import { GrMail } from "react-icons/gr";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { PostUrl } from "../BaseUrl";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleSubscribeNewsletter = () => {
    toast.dismiss();
    if (email === "") {
      return toast.error("Please Enter email!!!");
    }
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return toast.error("Please Enter valid email!!!");
    }
    setLoading(true);
    PostUrl("newsletter", { data: { email } })
      .then((res) => {
        setEmail("");
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setLoading(false);
      });
  };

  return (
    <>
      <div className="grid xl:grid-cols-4 md:grid-cols-2 text-lg font-medium place-items-start items-start bg-LIGHTGRAY xl:px-20 md:px-10 px-5 md:pt-10 md:pb-20 py-5 md:gap-10 gap-5">
        <div className="w-full">
          <Link to="/" className="inline-block">
            <img
              src={require("../assets/images/dollar-empire-logo 1.png")}
              className="md:w-44 w-fit h-fit object-fill object-center"
            />
          </Link>
        </div>
        <div className="space-y-3 w-full">
          <p className="flex items-start">
            <MdLocationOn className="w-5 h-5 text-black inline-block mt-2 mr-2" />
            4423 E. Bandini Blvd.
            <br /> Los Angeles, CA 90058
          </p>
          <p>
            <GrMail className="w-5 h-5 text-black inline-block mr-2" />
            <a href="mailto:sales@dollarempirellc.com">
              sales@dollarempirellc.com
            </a>
          </p>
          <p>
            <MdCall className="w-5 h-5 text-black inline-block mr-2" />
            <a href="tel:323-268-8999">323-268-8999</a>
          </p>
        </div>
        <div className="space-y-3  w-full">
          <Link
            className="block hover:pl-2 hover:border-l-4 hover:border-PRIMARY transition-all hover:text-PRIMARY duration-300"
            to="/about-us"
            onClick={toTop}
          >
            About us
          </Link>
          <Link
            className="block hover:pl-2 hover:border-l-4 hover:border-PRIMARY transition-all hover:text-PRIMARY duration-300"
            to="/contact-us"
            onClick={toTop}
          >
            Contact us
          </Link>
          <Link
            className="block hover:pl-2 hover:border-l-4 hover:border-PRIMARY transition-all hover:text-PRIMARY duration-300"
            to="/shipping-&-freight"
            onClick={toTop}
          >
            Shipping & freight
          </Link>
          <Link
            className="block hover:pl-2 hover:border-l-4 hover:border-PRIMARY transition-all hover:text-PRIMARY duration-300"
            to="/special-order"
            onClick={toTop}
          >
            Special orders
          </Link>
          <Link
            className="block hover:pl-2 hover:border-l-4 hover:border-PRIMARY transition-all hover:text-PRIMARY duration-300"
            to="/privacy-policy"
            onClick={toTop}
          >
            Privacy notice
          </Link>
        </div>
        <div className="space-y-3  w-full">
          <p>Subscribe to our newsletter</p>
          <div className="flex items-center w-full">
            <input
              type="email"
              className="pl-3 h-10 w-2/3 outline-none text-black font-normal"
              placeholder="Email Address"
              name="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="button"
              onClick={() => handleSubscribeNewsletter()}
              className="bg-black text-white hover:bg-PRIMARY duration-300 ease-linear h-10 w-1/3"
              disabled={loading}
            >
              {loading ? "..." : "Subscribe"}
            </button>
          </div>
        </div>
      </div>
      {/* bottom part */}
      <div className="bg-DARKBLUE text-white text-center w-full py-3">
        Copyright © {new Date().getFullYear()} Dollar Empire LLC
      </div>
    </>
  );
};

export default Footer;
