import React, { useState } from "react";
import EditAddress from "./EditAddress";
import { AiOutlinePlusCircle } from "react-icons/ai";

const Address = () => {
  const [showEditAddres, setShowEditAddres] = useState(false);
  return (
    <>
      {showEditAddres ? (
        <EditAddress setShowEditAddres={setShowEditAddres} />
      ) : (
        <div className="bg-white border border-BORDERGRAY p-5 w-full flex md:flex-row flex-col items-start md:gap-x-5 gap-y-4 md:gap-y-0">
          <div className=" capitalize border border-BORDERGRAY rounded-md p-3 text-BLACK space-y-2 text-left md:w-2/5 w-full min-h-[13rem]">
            <p className="font-semibold text-lg">John Adam</p>
            <p className="font-normal">Loys wood</p>
            <p className="font-normal">
              4127 State Street, Michigan, Southfield 48075 United States
            </p>
            <p className="font-normal">+01 123456475</p>
            <p className="flex items-center gap-x-3">
              <span
                role="button"
                className="text-PRIMARY"
                onClick={() => setShowEditAddres(true)}
              >
                Edit
              </span>{" "}
              <span role="button" className="text-red-400">
                Delete
              </span>
            </p>
          </div>
          <div className="border cursor-pointer border-BORDERGRAY rounded-md text-BLACK gap-y-2 text-center md:w-2/5 w-full min-h-[13rem] flex flex-col items-center justify-center">
            <AiOutlinePlusCircle className="h-10 w-10 text-TEXTGRAY block" />
            <p className="font-semibold text-TEXTGRAY">Add new address</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Address;
