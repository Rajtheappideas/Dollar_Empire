import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useSelector } from "react-redux";

const FilterComponent = ({
  setActivePrice,
  activePrice,
  title,
  categories,
  setActiveSubCategory,
}) => {
  const [shownCategories, setShownCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [isOpenCategory, setIsOpenCategory] = useState(false);
  const [isOpenPrice, setIsOpenPrice] = useState(false);

  const { subCategories, loading } = useSelector((state) => state.getContent);

  const { t } = useTranslation();

  useEffect(() => {
    const category = subCategories[title];
    setShownCategories(category?.subcategories);
    if (
      shownCategories !== undefined &&
      shownCategories.length !== 0 &&
      categories.includes(title)
    ) {
      setActiveCategory(shownCategories[0]?.name);
    }
  }, [loading, title]);
  return (
    <div className="w-full border border-BORDERGRAY bg-white">
      <p className="text-xl font-semibold text-left border-b border-BORDERGRAY py-4 px-3">
        {t("Filters")}
      </p>
      {/* categories */}
      {!loading && categories.includes(title) && (
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
              <p
                role="button"
                onClick={() => setActiveSubCategory("")}
                className="text-PRIMARY text-left text-base font-semibold"
              >
                {categories.includes(title) && title}
              </p>
              <ul className="pl-3 text-lg font-normal text-gray-400 capitalize">
                {shownCategories !== undefined &&
                  shownCategories.length !== 0 &&
                  shownCategories.map((category) => (
                    <li
                      key={category?._id}
                      className={`${
                        activeCategory === category?.name &&
                        "text-BLACK font-semibold"
                      } cursor-pointer hover:bg-gray-100 hover:text-black`}
                      onClick={() => {
                        setActiveCategory(category?.name);
                        setActiveSubCategory(category?.name);
                      }}
                    >
                      {category?.name}
                    </li>
                  ))}
              </ul>
            </>
          )}
        </div>
      )}
      {/* price */}
      <div className="w-full space-y-2 px-3 py-3 border-b border-BORDERGRAY">
        <p
          role="button"
          className="font-medium text-lg flex justify-between items-center w-full"
          onClick={() => setIsOpenPrice(!isOpenPrice)}
        >
          <span>{t("Price")}</span>
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
              <span>{t("Any")}</span>
            </li>
            <li
              className={`text-BLACK font-semibold flex items-center gap-x-2`}
              onClick={() => setActivePrice("Below $0.70")}
            >
              <input
                name="price"
                type="radio"
                value={activePrice}
                className="h-5 w-5 cursor-pointer"
              />
              <span>{t("Below")} $0.70</span>
            </li>
            <li
              className={`text-BLACK font-semibold flex items-center gap-x-2`}
              onClick={() => setActivePrice("$0.70 - $0.89")}
            >
              <input
                name="price"
                type="radio"
                value={activePrice}
                className="h-5 w-5 cursor-pointer"
              />
              <span>$0.70 - $0.89</span>
            </li>
            <li
              className={`text-BLACK font-semibold flex items-center gap-x-2`}
              onClick={() => setActivePrice("$0.90 - $1.99")}
            >
              <input
                name="price"
                type="radio"
                value={activePrice}
                className="h-5 w-5 cursor-pointer"
              />
              <span>$0.90 - $1.99</span>
            </li>
            <li
              className={`text-BLACK font-semibold flex items-center gap-x-2`}
              onClick={() => setActivePrice("$2 - $2.99")}
            >
              <input
                name="price"
                type="radio"
                value={activePrice}
                className="h-5 w-5 cursor-pointer"
              />
              <span>$2 - $2.99</span>
            </li>
            <li
              className={`text-BLACK font-semibold flex items-center gap-x-2`}
              onClick={() => setActivePrice("Low_to_high")}
            >
              <input
                name="price"
                type="radio"
                value={activePrice}
                className="h-5 w-5 cursor-pointer"
              />
              <span>{t("Low to high")}</span>
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
              />
              <span>{t("High to low")}</span>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default FilterComponent;
