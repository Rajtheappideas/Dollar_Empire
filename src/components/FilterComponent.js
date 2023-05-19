import React from "react";
import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const FilterComponent = ({ setFilterProducts }) => {
  const [activeCategory, setActiveCategory] = useState(
    "Audio & Video Supplies"
  );
  const [isOpenCategory, setIsOpenCategory] = useState(false);
  const [isOpenPrice, setIsOpenPrice] = useState(false);
  const [activePrice, setActivePrice] = useState("Any");

  return (
    <div className="w-full border border-BORDERGRAY bg-white">
      <p className="text-xl font-semibold text-left border-b border-BORDERGRAY py-4 px-3">
        Filters
      </p>
      {/* categories */}
      <div className="w-full space-y-2 px-3 py-3 border-b border-BORDERGRAY">
        <p
          role="button"
          className="font-medium text-lg flex justify-between items-center w-full"
          onClick={() => setIsOpenCategory(!isOpenCategory)}
        >
          <span>Categories</span>
          {isOpenCategory ? (
            <FiChevronUp className="h-6 w-6" />
          ) : (
            <FiChevronDown className="h-6 w-6" />
          )}
        </p>
        {isOpenCategory && (
          <>
            <p className="text-PRIMARY text-left text-base font-semibold">
              Electronics
            </p>
            <ul className="pl-3 text-lg font-normal text-gray-400 capitalize">
              <li
                className={`${
                  activeCategory === "Audio & Video Supplies" &&
                  "text-BLACK font-semibold"
                } cursor-pointer`}
                onClick={() => setActiveCategory("Audio & Video Supplies")}
              >
                Audio & Video supplies
              </li>
              <li
                className={`${
                  activeCategory === "Batteries" && "text-BLACK font-semibold"
                } cursor-pointer`}
                onClick={() => setActiveCategory("Batteries")}
              >
                Batteries
              </li>
              <li
                className={`${
                  activeCategory === "Cameras & Clocks" &&
                  "text-BLACK font-semibold"
                } cursor-pointer`}
                onClick={() => setActiveCategory("Cameras & Clocks")}
              >
                Cameras & Clocks
              </li>
              <li
                className={`${
                  activeCategory === "Electric Accessories" &&
                  "text-BLACK font-semibold"
                } cursor-pointer`}
                onClick={() => setActiveCategory("Electric Accessories")}
              >
                Electric Accessories
              </li>
            </ul>
          </>
        )}
      </div>
      {/* price */}
      <div className="w-full space-y-2 px-3 py-3 border-b border-BORDERGRAY">
        <p
          role="button"
          className="font-medium text-lg flex justify-between items-center w-full"
          onClick={() => setIsOpenPrice(!isOpenPrice)}
        >
          <span>Price</span>
          {isOpenPrice ? (
            <FiChevronUp className="h-6 w-6" />
          ) : (
            <FiChevronDown className="h-6 w-6" />
          )}
        </p>
        {isOpenPrice && (
          <ul className="pl-3 text-lg font-normal text-gray-400 capitalize space-y-1">
            <li
              className={`text-BLACK font-semibold flex items-center gap-x-2`}
              onClick={() => setActivePrice("Any")}
            >
              <input
                name="price"
                type="radio"
                value={activePrice}
                className="h-5 w-5 cursor-pointer"
                defaultChecked
              />
              <span>Any</span>
            </li>
            <li
              className={`text-BLACK font-semibold flex items-center gap-x-2`}
              onClick={() => setActivePrice("Below $.70")}
            >
              <input
                name="price"
                type="radio"
                value={activePrice}
                className="h-5 w-5 cursor-pointer"
              />
              <span>Below $.70</span>
            </li>
            <li
              className={`text-BLACK font-semibold flex items-center gap-x-2`}
              onClick={() => setActivePrice("$.70 ~ $.89")}
            >
              <input
                name="price"
                type="radio"
                value={activePrice}
                className="h-5 w-5 cursor-pointer"
              />
              <span>$.70 ~ $.89</span>
            </li>
            <li
              className={`text-BLACK font-semibold flex items-center gap-x-2`}
              onClick={() => setActivePrice("$.90 ~ $1.99")}
            >
              <input
                name="price"
                type="radio"
                value={activePrice}
                className="h-5 w-5 cursor-pointer"
              />
              <span>$.90 ~ $1.99</span>
            </li>
            <li
              className={`text-BLACK font-semibold flex items-center gap-x-2`}
              onClick={() => setActivePrice("$2 ~ $2.99")}
            >
              <input
                name="price"
                type="radio"
                value={activePrice}
                className="h-5 w-5 cursor-pointer"
              />
              <span>$2 ~ $2.99</span>
            </li>
            <li
              className={`text-BLACK font-semibold flex items-center gap-x-2`}
              onClick={() => setActivePrice("Low to high")}
            >
              <input
                name="price"
                type="radio"
                value={activePrice}
                className="h-5 w-5 cursor-pointer"
              />
              <span>Low to high</span>
            </li>
            <li
              className={`text-BLACK font-semibold flex items-center gap-x-2`}
              onClick={() => setActivePrice("High to low")}
            >
              <input
                name="price"
                type="radio"
                value={activePrice}
                className="h-5 w-5 cursor-pointer"
              />
              <span>High to low</span>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default FilterComponent;
