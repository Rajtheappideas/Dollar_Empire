import React from "react";
import apparel from "../../assets/images/apparel.png";
import bed_bath from "../../assets/images/bed&bath.png";
import camping from "../../assets/images/camping.png";
import cosmetics from "../../assets/images/cosmetics.png";
import electronics from "../../assets/images/electronics.png";
import hair_care from "../../assets/images/hair&care.png";
import hardware from "../../assets/images/hardware.png";
import healthcare from "../../assets/images/healthcare.png";
import jewellery from "../../assets/images/jewellery.png";
import lighting from "../../assets/images/lighting.png";

const Categories = () => {
  const categories = [
    { id: 1, title: "Apparel", img: apparel },
    { id: 2, title: "Bed & Bath", img: bed_bath },
    { id: 3, title: "Camping", img: camping },
    { id: 4, title: "Cosmetics", img: cosmetics },
    { id: 5, title: "Electronics", img: electronics },
    { id: 6, title: "Hair care", img: hair_care },
    { id: 7, title: "Hardware", img: hardware },
    { id: 8, title: "Health care", img: healthcare },
    { id: 9, title: "jewellery", img: jewellery },
    { id: 10, title: "Lighting", img: lighting },
  ];
  return (
    <section className="container mx-auto w-full md:pt-5 pb-20 py-2 md:space-y-5 space-y-3 xl:px-0 md:px-10 px-3">
      <p className="font-bold text-center md:text-3xl text-xl uppercase">Categories</p>
      <div className=" w-full grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 place-items-center items-center md:gap-8 gap-5">
        {categories.map((category) => (
          <div
            key={category?.id}
            className={`space-y-3 w-full text-center ${
              category.id === 9 &&
              "xl:col-span-1 lg:col-span-2 lg:w-1/2 xl:w-full"
            } ${
              category.id === 10 &&
              "xl:col-span-1 lg:col-span-2 md:col-span-3 lg:w-1/2 md:w-1/3 xl:w-full"
            } `}
          >
            <img
              src={category.img}
              alt={category.title}
              className="w-fit h-fit object-contain object-center rounded-lg"
            />
            <p className="capitalize md:text-lg font-bold">{category.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
