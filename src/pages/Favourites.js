import React from "react";
import { Helmet } from "react-helmet";
import {
  AiOutlineClose,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link } from "react-router-dom";

const Favourites = () => {
  return (
    <>
      <Helmet title="Favourites" />
      <section className="bg-BACKGROUNDGRAY w-full ">
        <div className="container mx-auto space_for_div space-y-5 w-full bg-BACKGROUNDGRAY lg:pb-20 pb-10">
          <h1 className="block font-semibold md:text-4xl text-2xl text-left py-1">
            Your Favourites
          </h1>

          {/* table */}
          <div className="w-full xl:overflow-hidden overflow-x-scroll scrollbar">
            <table className="w-full">
              <thead className="bg-PRIMARY text-white p-2 w-full">
                <tr>
                  <th className="w-40 lg:p-3 p-2 font-semibold text-left text-base">
                    Image
                  </th>
                  <th className="md:min-w-[20rem] min-w-[10rem] lg:p-3 p-2 font-semibold text-left text-base">
                    Product
                  </th>
                  <th className="xl:min-w-[5rem] md:min-w-[8rem] min-w-[5rem] lg:p-3 p-2 font-semibold text-left text-base">
                    Item no.
                  </th>
                  <th className="lg:p-3 p-2 font-semibold text-center text-base">
                    Packing
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white font-normal text-base border-b border-gray-200">
                  <td className="lg:p-3 p-2">
                    <img
                      src={require("../assets/images/product-2.png")}
                      alt="product"
                      className="min-h-[6rem] min-w-[6em] object-contain object-center"
                    />
                  </td>
                  <td className="font-semibold lg:p-3 p-2 whitespace-nowrap">
                    Nose and ear portable Trimmer
                  </td>
                  <td className="lg:p-3 p-2 ">#123456</td>

                  <td className="lg:p-3 p-2">
                    <div className="text-right w-full flex items-center justify-start gap-x-6">
                      <p className="xl:w-4/12 w-3/12 whitespace-nowrap text-right">
                        24 PC/PK , 144 PC/CTN
                      </p>
                      <div className="xl:w-7/12 w-8/12 space-y-3">
                        <div className="flex w-64 items-center gap-x-2 relative z-0 ml-auto">
                          <input
                            name="quantity"
                            type="radio"
                            className="w-5 h-5"
                          />
                          <span className="font-semibold text-sm whitespace-nowrap pr-2">
                            PC QTY
                          </span>
                          <div className="w-full relative z-0">
                            <input
                              type="text"
                              className="w-full h-10 text-sm pr-[5.4rem] pl-5 rounded-md outline-none border border-BORDERGRAY"
                              placeholder="24 PC"
                            />
                            <span className="font-semibold text-BLACK text-sm absolute top-1/2 -translate-y-1/2 right-8">
                              0 PK
                            </span>
                            <AiOutlineMinus
                              role="button"
                              className=" text-BLACK w-4 h-4 absolute top-1/2 -translate-y-1/2 left-1"
                            />
                            <AiOutlinePlus
                              role="button"
                              className=" text-BLACK w-4 h-4 absolute top-1/2 -translate-y-1/2 right-2"
                            />
                          </div>
                        </div>
                        <div className="flex w-64 items-center gap-x-2 relative z-0 ml-auto">
                          <input
                            name="quantity"
                            type="radio"
                            className="w-5 h-5"
                          />
                          <span className="font-semibold text-sm whitespace-nowrap">
                            CTN QTY
                          </span>
                          <div className="w-full relative z-0">
                            <input
                              type="text"
                              className="w-full h-10 text-sm pr-[5.4rem] pl-5 rounded-md outline-none border border-BORDERGRAY"
                              placeholder="144 PC"
                            />
                            <span className="font-semibold text-BLACK text-sm absolute top-1/2 -translate-y-1/2 right-8">
                              0 CTN
                            </span>
                            <AiOutlineMinus
                              role="button"
                              className=" text-BLACK w-4 h-4 absolute top-1/2 -translate-y-1/2 left-1"
                            />
                            <AiOutlinePlus
                              role="button"
                              className=" text-BLACK w-4 h-4 absolute top-1/2 -translate-y-1/2 right-2"
                            />
                          </div>
                        </div>
                        <p className="w-7/12 h-auto ml-auto">
                          <Link to="/cart" className="w-full">
                            <button
                              type="button"
                              className="bg-DARKRED text-white text-center w-full p-2 rounded-lg"
                            >
                              Add to cart
                              <AiOutlineShoppingCart className="w-6 h-6 ml-2 inline-block" />
                            </button>
                          </Link>
                        </p>
                      </div>
                      <p className="w-1/12">
                        <AiOutlineClose role="button" className="h-6 w-6" />
                      </p>
                    </div>
                  </td>
                </tr>
                <tr className="bg-white font-normal text-base border-b border-gray-200">
                  <td className="lg:p-3 p-2">
                    <img
                      src={require("../assets/images/product-2.png")}
                      alt="product"
                      className="min-h-[6rem] min-w-[6em] object-contain object-center"
                    />
                  </td>
                  <td className="font-semibold lg:p-3 p-2 whitespace-nowrap">
                    Nose and ear portable Trimmer
                  </td>
                  <td className="lg:p-3 p-2 ">#123456</td>

                  <td className="lg:p-3 p-2">
                    <div className="text-right w-full flex items-center justify-start gap-x-6">
                      <p className="xl:w-4/12 w-3/12 whitespace-nowrap text-right">
                        24 PC/PK , 144 PC/CTN
                      </p>
                      <div className="xl:w-7/12 w-8/12 space-y-3">
                        <div className="flex w-64 items-center gap-x-2 relative z-0 ml-auto">
                          <input
                            name="quantity"
                            type="radio"
                            className="w-5 h-5"
                          />
                          <span className="font-semibold text-sm whitespace-nowrap pr-2">
                            PC QTY
                          </span>
                          <div className="w-full relative z-0">
                            <input
                              type="text"
                              className="w-full h-10 text-sm pr-[5.4rem] pl-5 rounded-md outline-none border border-BORDERGRAY"
                              placeholder="24 PC"
                            />
                            <span className="font-semibold text-BLACK text-sm absolute top-1/2 -translate-y-1/2 right-8">
                              0 PK
                            </span>
                            <AiOutlineMinus
                              role="button"
                              className=" text-BLACK w-4 h-4 absolute top-1/2 -translate-y-1/2 left-1"
                            />
                            <AiOutlinePlus
                              role="button"
                              className=" text-BLACK w-4 h-4 absolute top-1/2 -translate-y-1/2 right-2"
                            />
                          </div>
                        </div>
                        <div className="flex w-64 items-center gap-x-2 relative z-0 ml-auto">
                          <input
                            name="quantity"
                            type="radio"
                            className="w-5 h-5"
                          />
                          <span className="font-semibold text-sm whitespace-nowrap">
                            CTN QTY
                          </span>
                          <div className="w-full relative z-0">
                            <input
                              type="text"
                              className="w-full h-10 text-sm pr-[5.4rem] pl-5 rounded-md outline-none border border-BORDERGRAY"
                              placeholder="144 PC"
                            />
                            <span className="font-semibold text-BLACK text-sm absolute top-1/2 -translate-y-1/2 right-8">
                              0 CTN
                            </span>
                            <AiOutlineMinus
                              role="button"
                              className=" text-BLACK w-4 h-4 absolute top-1/2 -translate-y-1/2 left-1"
                            />
                            <AiOutlinePlus
                              role="button"
                              className=" text-BLACK w-4 h-4 absolute top-1/2 -translate-y-1/2 right-2"
                            />
                          </div>
                        </div>
                        <p className="w-7/12 h-auto ml-auto">
                          <Link to="/cart" className="w-full">
                            <button
                              type="button"
                              className="bg-DARKRED text-white text-center w-full p-2 rounded-lg"
                            >
                              Add to cart
                              <AiOutlineShoppingCart className="w-6 h-6 ml-2 inline-block" />
                            </button>
                          </Link>
                        </p>
                      </div>
                      <p className="w-1/12">
                        <AiOutlineClose role="button" className="h-6 w-6" />
                      </p>
                    </div>
                  </td>
                </tr>
                <tr className="bg-white font-normal text-base border-b border-gray-200">
                  <td className="lg:p-3 p-2">
                    <img
                      src={require("../assets/images/product-2.png")}
                      alt="product"
                      className="min-h-[6rem] min-w-[6em] object-contain object-center"
                    />
                  </td>
                  <td className="font-semibold lg:p-3 p-2 whitespace-nowrap">
                    Nose and ear portable Trimmer
                  </td>
                  <td className="lg:p-3 p-2 ">#123456</td>

                  <td className="lg:p-3 p-2">
                    <div className="text-right w-full flex items-center justify-start gap-x-6">
                      <p className="xl:w-4/12 w-3/12 whitespace-nowrap text-right">
                        24 PC/PK , 144 PC/CTN
                      </p>
                      <div className="xl:w-7/12 w-8/12 space-y-3">
                        <div className="flex w-64 items-center gap-x-2 relative z-0 ml-auto">
                          <input
                            name="quantity"
                            type="radio"
                            className="w-5 h-5"
                          />
                          <span className="font-semibold text-sm whitespace-nowrap pr-2">
                            PC QTY
                          </span>
                          <div className="w-full relative z-0">
                            <input
                              type="text"
                              className="w-full h-10 text-sm pr-[5.4rem] pl-5 rounded-md outline-none border border-BORDERGRAY"
                              placeholder="24 PC"
                            />
                            <span className="font-semibold text-BLACK text-sm absolute top-1/2 -translate-y-1/2 right-8">
                              0 PK
                            </span>
                            <AiOutlineMinus
                              role="button"
                              className=" text-BLACK w-4 h-4 absolute top-1/2 -translate-y-1/2 left-1"
                            />
                            <AiOutlinePlus
                              role="button"
                              className=" text-BLACK w-4 h-4 absolute top-1/2 -translate-y-1/2 right-2"
                            />
                          </div>
                        </div>
                        <div className="flex w-64 items-center gap-x-2 relative z-0 ml-auto">
                          <input
                            name="quantity"
                            type="radio"
                            className="w-5 h-5"
                          />
                          <span className="font-semibold text-sm whitespace-nowrap">
                            CTN QTY
                          </span>
                          <div className="w-full relative z-0">
                            <input
                              type="text"
                              className="w-full h-10 text-sm pr-[5.4rem] pl-5 rounded-md outline-none border border-BORDERGRAY"
                              placeholder="144 PC"
                            />
                            <span className="font-semibold text-BLACK text-sm absolute top-1/2 -translate-y-1/2 right-8">
                              0 CTN
                            </span>
                            <AiOutlineMinus
                              role="button"
                              className=" text-BLACK w-4 h-4 absolute top-1/2 -translate-y-1/2 left-1"
                            />
                            <AiOutlinePlus
                              role="button"
                              className=" text-BLACK w-4 h-4 absolute top-1/2 -translate-y-1/2 right-2"
                            />
                          </div>
                        </div>
                        <p className="w-7/12 h-auto ml-auto">
                          <Link to="/cart" className="w-full">
                            <button
                              type="button"
                              className="bg-DARKRED text-white text-center w-full p-2 rounded-lg"
                            >
                              Add to cart
                              <AiOutlineShoppingCart className="w-6 h-6 ml-2 inline-block" />
                            </button>
                          </Link>
                        </p>
                      </div>
                      <p className="w-1/12">
                        <AiOutlineClose role="button" className="h-6 w-6" />
                      </p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default Favourites;
