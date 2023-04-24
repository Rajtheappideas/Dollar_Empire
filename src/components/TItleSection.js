import React from "react";

const TItleSection = ({ title, image }) => {
  return (
    <div className="relative md:h-80 h-60">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover object-center opacity-100"
        loading="lazy"
      />
      <h1 className="font-bold text-white uppercase md:text-4xl text-2xl text-center absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
        {title}
      </h1>
    </div>
  );
};

export default TItleSection;
