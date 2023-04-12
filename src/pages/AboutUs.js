import React from "react";
import TItleSection from "../components/TItleSection";
import { Helmet } from "react-helmet";
import bgImg from "../assets/images/aboutus.jpg";

const AboutUs = () => {
  return (
    <>
      <Helmet title="About Us" />
      <div className="w-full space-y-5 md:pb-20 pb-10">
        <TItleSection title={"About Us"} image={bgImg} />
        <section className="container mx-auto md:space-y-20 space-y-10 space_for_div">
          <p className="text-TEXTGRAY font-normal tracking-normal leading-normal text-center lg:text-base text-sm lg:w-9/12 md:w-10/12 w-11/12 mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proiden.
          </p>
          {/* first div */}
          <div className="w-full grid lg:grid-cols-2 place-items-start items-center gap-10">
            <img
              src={require("../assets/images/aboutus-1.png")}
              alt=""
              className="w-full h-fit object-contain object-center"
            />
            <div className="space-y-5">
              <p className="font-bold md:text-3xl text-xl text-left uppercase">
                Our Service
              </p>
              <p className="font-normal text-TEXTGRAY text-justify w-full">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <p className="font-normal text-TEXTGRAY text-justify w-full">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </div>
          {/* second div */}
          <div className="w-full grid lg:grid-cols-2 place-items-start items-center gap-10">
            <div className="space-y-5">
              <p className="font-bold md:text-3xl text-xl text-left uppercase">
                Our Service
              </p>
              <p className="font-normal text-TEXTGRAY text-justify w-full">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <p className="font-normal text-TEXTGRAY text-justify w-full">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
            <img
              src={require("../assets/images/aboutus-2.png")}
              alt=""
              className="w-full h-fit object-contain object-center"
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutUs;
