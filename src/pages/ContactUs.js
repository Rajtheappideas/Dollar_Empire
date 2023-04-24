import React from "react";
import { Helmet } from "react-helmet";
import TItleSection from "../components/TItleSection";
import bgImg from "../assets/images/contactus.jpg";
import { MdCall, MdLocationOn } from "react-icons/md";
import { GrMail } from "react-icons/gr";
import ReCAPTCHA from "react-google-recaptcha";

const ContactUs = () => {
  function onChange(value) {
    // console.log("Captcha value:", value);
    return null;
  }
  return (
    <>
      <Helmet title="Contact Us" />
      <TItleSection title={"Contact us"} image={bgImg} />
      <section className="xl:w-2/3 lg:w-4/5 w-full lg:px-0 px-3 mx-auto flex md:flex-row flex-col items-start justify-center gap-5 py-5">
        {/* left side div */}
        <div className="md:w-1/3 w-full space-y-5 rounded-lg border border-gray-200">
          <img
            src={require("../assets/images/contact.jpg")}
            alt=""
            className="h-fit w-full object-contain object-center"
          />
          <div className="space-y-5 xl:px-10 px-3 relative">
            {/* address */}
            <div className="flex items-start gap-x-2">
              <p>
                <MdLocationOn className="h-5 w-5 text-PRIMARY inline-block" />
              </p>
              <p>
                <span className="font-semibold inline-block">Address:</span>
                <span className="font-semibold inline-block">
                  4423 E. Bandini Blvd. Los Angeles, CA 90058
                </span>
              </p>
            </div>
            {/* call */}
            <div className="flex items-start gap-x-2">
              <p>
                <MdCall className="h-5 w-5 text-PRIMARY inline-block" />
              </p>
              <p>
                <span className="font-semibold block">Phone number:</span>
                <a href="tel:323-268-8999" className="font-semibold block">
                  323-268-8999
                </a>
              </p>
            </div>
            {/* mail */}
            <div className="flex items-start gap-x-2 pb-10">
              <p>
                <GrMail className="h-5 w-5 text-PRIMARY block" />
              </p>
              <p>
                <span className="font-semibold block">Email:</span>
                <a
                  href="mailto:sales@dollarempirellc.com"
                  className="font-semibold block text-PRIMARY"
                >
                  sales@dollarempirellc.com
                </a>
              </p>
            </div>
            <hr className="py-2 bg-PRIMARY absolute bottom-0 left-0 w-full rounded-bl-lg rounded-br-lg" />
          </div>
        </div>
        {/* right side div */}
        <div className="md:w-2/3 w-full p-4 rounded-lg border border-BORDERGRAY space-y-4">
          <h1 className="font-semibold text-PRIMARY md:text-3xl text-xl text-left">
            Get In Tocuh
          </h1>
          <hr />
          {/* name */}
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
          {/* email , phone */}
          <div className="flex items-start w-full gap-x-3">
            <div className="w-1/2">
              <label className="text-black font-medium block text-left text-lg">
                Email address*
              </label>
              <input
                type="email"
                className="bg-LIGHTGRAY w-full text-black placeholder:text-gray-400 rounded-md p-3"
                placeholder="abc@gmail.com"
              />
            </div>
            <div className="w-1/2">
              <label className="text-black font-medium block text-left text-lg">
                Phone number*
              </label>
              <input
                type="number"
                className="bg-LIGHTGRAY w-full text-black placeholder:text-gray-400 rounded-md p-3"
                placeholder="+1234567890"
              />
            </div>
          </div>
          {/* message */}
          <label className="text-black font-medium block text-left text-lg">
            Comments*
          </label>
          <textarea
            className="bg-LIGHTGRAY w-full text-black placeholder:text-gray-400 rounded-md p-3 min-h-[8rem]"
            placeholder="message..."
          />
          <p>Please check the box below to proceed.</p>
          <ReCAPTCHA
            sitekey={process.env.REACT_APP_RECAPTCHA_KEY}
            onChange={onChange}
          />{" "}
          <button
            type="button"
            className="bg-PRIMARY active:translate-y-2 hover:text-PRIMARY hover:bg-white border border-PRIMARY duration-500 p-3 text-white text-center w-40 rounded-md uppercase font-bold"
          >
            send
          </button>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
