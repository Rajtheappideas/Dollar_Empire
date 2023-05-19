import React from "react";
import { useSelector } from "react-redux";
import baseUrl from "../../BaseUrl";
import { Link } from "react-router-dom";

const Categories = () => {
  const { categories, loading } = useSelector((state) => state.getContent);

  return (
    <section className="container mx-auto w-full md:pt-5 pb-20 py-2 md:space-y-5 space-y-3 xl:px-0 md:px-10 px-3">
      <p className="font-bold text-center md:text-3xl text-xl uppercase">
        Categories
      </p>
      <div className=" w-full grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 place-items-center items-center md:gap-8 gap-5">
        {loading ? (
          <p className="col-span-full text-center p-3 font-semibold md:text-3xl text-xl">
            Loading...
          </p>
        ) : (
          categories.map((category) => (
            <Link
              to={`/product-listing/${category.name}`}
              // state={{
              //   title: category.name,
              //   price: null,
              //   searchQuery: "",
              // }}
              key={category?._id}
              className={`space-y-3 w-full text-center ${
                category.id === 9 &&
                "xl:col-span-1 lg:col-span-2 lg:w-1/2 xl:w-full"
              } ${
                category.id === 10 &&
                "xl:col-span-1 lg:col-span-2 md:col-span-3 lg:w-1/2 md:w-1/3 xl:w-full"
              } `}
            >
              <img
                src={baseUrl.concat(category.image)}
                alt={category.name}
                className="w-fit h-fit object-contain object-center rounded-lg"
              />
              <p className="capitalize md:text-lg font-bold">{category.name}</p>
            </Link>
          ))
        )}
      </div>
    </section>
  );
};

export default Categories;
