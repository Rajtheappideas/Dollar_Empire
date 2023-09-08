import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  handleChangeActiveCategory,
  handleChangeActiveSubcategory,
} from "../redux/GlobalStates";

const FilterComponent = ({ setActivePrice, activePrice, title }) => {
  const [shownCategories, setShownCategories] = useState([]);
  const [isOpenCategory, setIsOpenCategory] = useState(true);
  const [isOpenPrice, setIsOpenPrice] = useState(true);
  const [isCategoryThere, setIsCategoryThere] = useState(false);

  const { subCategories, loading, categories, filters } = useSelector(
    (state) => state.getContent
  );
  const { activeCategory, activeSubcategory } = useSelector(
    (state) => state.globalStates
  );

  const { t } = useTranslation();

  const dispatch = useDispatch();

  useEffect(() => {
    const category = subCategories[title];
    setShownCategories(category?.subcategories);

    const titleIsThere = categories.find((cate) => cate?.name.includes(title));
    if (!titleIsThere) {
      setIsCategoryThere(false);
    } else {
      setIsCategoryThere(true);
    }
  }, [loading, title, subCategories, categories]);

  useEffect(() => {
    dispatch(handleChangeActiveCategory(title));
  }, []);

  return (
    <div className="w-full select-none border border-BORDERGRAY bg-white">
      <p className="text-xl font-semibold text-left border-b border-BORDERGRAY py-4 px-3">
        {t("Filters")}
      </p>
      {/* categories */}
      {!loading && isCategoryThere && (
        <div className="w-full  space-y-2 px-3 py-3 border-b border-BORDERGRAY">
          <p
            role="button"
            className="font-medium text-lg flex justify-between items-center w-full"
            onClick={() => setIsOpenCategory(!isOpenCategory)}
          >
            <span>Categories</span>
            <FiChevronUp
              className={`h-6 w-6 ${
                isOpenCategory ? "rotate-0" : "rotate-180"
              }  transition duration-100`}
            />
          </p>
          {isOpenCategory && (
            <>
              <p
                role="button"
                onClick={() => {
                  dispatch(handleChangeActiveCategory(title));
                  dispatch(handleChangeActiveSubcategory(""));
                }}
                className="text-PRIMARY text-left text-base font-semibold"
              >
                {activeCategory}
              </p>
              <ul className="font-normal text-gray-400 capitalize w-full">
                {shownCategories !== undefined &&
                  shownCategories.length !== 0 &&
                  shownCategories.map((category) => (
                    <li
                      key={category?._id}
                      className={`${
                        activeSubcategory === category?.name &&
                        "text-BLACK font-semibold bg-gray-200"
                      } cursor-pointer px-2 flex items-center gap-x-2 justify-between text-left hover:bg-gray-100 hover:text-black text-base w-full`}
                      onClick={() => {
                        dispatch(handleChangeActiveSubcategory(category?.name));
                      }}
                    >
                      <p className="truncate w-[90%]" title={category?.name}>
                        {category?.name}
                      </p>
                      <p className="w-fit text-sm text-left">
                        ({category?.productCount})
                      </p>
                    </li>
                  ))}
              </ul>
            </>
          )}
        </div>
      )}
      {/* price */}
      <div className="w-full select-none space-y-2 px-3 py-3 border-b border-BORDERGRAY">
        <p
          role="button"
          className="font-medium text-lg flex justify-between items-center w-full"
          onClick={() => setIsOpenPrice(!isOpenPrice)}
        >
          <span>{t("Price")}</span>
          <FiChevronUp
            className={`h-6 w-6 ${
              isOpenPrice ? "rotate-0" : "rotate-180"
            }  transition duration-100`}
          />
        </p>
        {isOpenPrice && (
          <ul className="pl-3 md:text-lg text-sm font-normal text-gray-400 capitalize space-y-1">
            <li
              className={`text-BLACK font-semibold flex items-center gap-x-2`}
              onClick={() => setActivePrice("Any")}
            >
              <input
                name="price"
                type="radio"
                value={activePrice}
                className="min-h-[20px] min-w-[20px] cursor-pointer"
                defaultChecked
                id="Any"
              />
              <label htmlFor="Any" className="cursor-pointer">
                {t("Any")}
              </label>
            </li>
            {filters.length > 0 ? (
              filters.map((filter, index) => (
                <li
                  key={index}
                  className={`text-BLACK font-semibold flex items-center gap-x-2`}
                  onClick={() => setActivePrice(filter)}
                >
                  <input
                    name="price"
                    type="radio"
                    value={activePrice}
                    className="h-5 w-5 cursor-pointer"
                    id={filter}
                  />
                  <label htmlFor={filter} className="cursor-pointer">
                    {filter}
                  </label>
                </li>
              ))
            ) : (
              <>
                <li
                  className={`text-BLACK font-semibold flex items-center gap-x-2`}
                  onClick={() => setActivePrice("Below $0.49")}
                >
                  <input
                    name="price"
                    type="radio"
                    value={activePrice}
                    className="h-5 w-5 cursor-pointer"
                    id="below $0.49"
                  />
                  <label htmlFor="below $0.49" className="cursor-pointer">
                    {t("Below")} $0.49
                  </label>
                </li>
                <li
                  className={`text-BLACK font-semibold flex items-center gap-x-2`}
                  onClick={() => setActivePrice("$0.50 - $0.79")}
                >
                  <input
                    name="price"
                    type="radio"
                    value={activePrice}
                    className="h-5 w-5 cursor-pointer"
                    id="$0.50 - $0.79"
                  />
                  <label htmlFor="$0.50 - $0.79" className="cursor-pointer">
                    $0.50 - $0.79
                  </label>
                </li>
                <li
                  className={`text-BLACK font-semibold flex items-center gap-x-2`}
                  onClick={() => setActivePrice("$0.80 - $0.99")}
                >
                  <input
                    name="price"
                    type="radio"
                    value={activePrice}
                    className="h-5 w-5 cursor-pointer"
                    id="$0.80 - $0.99"
                  />
                  <label htmlFor="$0.80 - $0.99" className="cursor-pointer">
                    $0.80 - $0.99
                  </label>
                </li>
                <li
                  className={`text-BLACK font-semibold flex items-center gap-x-2`}
                  onClick={() => setActivePrice("$1.00 - $1.49")}
                >
                  <input
                    name="price"
                    type="radio"
                    value={activePrice}
                    className="h-5 w-5 cursor-pointer"
                    id="$1.00 - $1.49"
                  />
                  <label htmlFor="$1.00 - $1.49" className="cursor-pointer">
                    $1.00 - $1.49
                  </label>
                </li>
                <li
                  className={`text-BLACK font-semibold flex items-center gap-x-2`}
                  onClick={() => setActivePrice("$1.50 - $1.99")}
                >
                  <input
                    name="price"
                    type="radio"
                    value={activePrice}
                    className="h-5 w-5 cursor-pointer"
                    id="$1.50 - $1.99"
                  />
                  <label htmlFor="$1.50 - $1.99" className="cursor-pointer">
                    $1.50 - $1.99
                  </label>
                </li>
                <li
                  className={`text-BLACK font-semibold flex items-center gap-x-2`}
                  onClick={() => setActivePrice("$2.00 And Above")}
                >
                  <input
                    name="price"
                    type="radio"
                    value={activePrice}
                    className="h-5 w-5 cursor-pointer"
                    id="$2.00 above"
                  />
                  <label htmlFor="$2.00 above" className="cursor-pointer">
                    $2.00 And {t("Above")}
                  </label>
                </li>
              </>
            )}

            <li
              className={`text-BLACK font-semibold flex items-center gap-x-2`}
              onClick={() => setActivePrice("Low_to_high")}
            >
              <input
                name="price"
                type="radio"
                value={activePrice}
                className="h-5 w-5 cursor-pointer"
                id="Low_to_high"
              />
              <label htmlFor="Low_to_high" className="cursor-pointer">
                {t("Low to high")}
              </label>
            </li>
            <li
              className={`text-BLACK font-semibold flex items-center gap-x-2`}
              onClick={() => setActivePrice("High_to_low")}
            >
              <input
                name="price"
                type="radio"
                value={activePrice}
                className="h-5 w-5 cursor-pointer"
                id="High_to_low"
              />
              <label htmlFor="High_to_low" className="cursor-pointer">
                {t("High to low")}
              </label>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default FilterComponent;
