import React, { useState } from "react";
import EditAddress from "./EditAddress";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import AddNewAddress from "./AddNewAddress";
import { handlePostDeleteAddress } from "../../redux/FeatureSlice";
import { useRef } from "react";
import { useEffect } from "react";
import { handleGetAddresses } from "../../redux/GetContentSlice";
import { toast } from "react-hot-toast";

const Address = () => {
  const [showEditAddres, setShowEditAddres] = useState(false);
  const [showNewAddress, setShowNewAddress] = useState(false);
  const [addressId, setAddressId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const { addressList, loading } = useSelector((state) => state.getContent);

  const { token } = useSelector((state) => state.Auth);

  const dispatch = useDispatch();

  const AbortControllerRef = useRef(null);

  const handleDeleteAddress = (id) => {
    setDeleteLoading(true);
    const response = dispatch(
      handlePostDeleteAddress({ id, token, signal: AbortControllerRef })
    );
    if (response) {
      response.then((res) => {
        if (res.payload.status === "success") {
          toast.success("Address deleted successfully.");
          setDeleteLoading(false);
          dispatch(handleGetAddresses({ token }));
        } else {
          toast.error(res.payload.message);
          setDeleteLoading(false);
        }
      });
    }
  };

  useEffect(() => {
    return () => {
      AbortControllerRef.current !== null && AbortControllerRef.current.abort();
    };
  }, []);
  return (
    <>
      {loading ? (
        <p className="font-semibold md:text-3xl text-lg text-center w-full">
          Loading...
        </p>
      ) : showEditAddres ? (
        <EditAddress
          addressId={addressId}
          setShowEditAddres={setShowEditAddres}
        />
      ) : showNewAddress && !showEditAddres ? (
        <AddNewAddress setShowNewAddress={setShowNewAddress} />
      ) : (
        <div className="bg-white border border-BORDERGRAY p-5 w-full flex flex-wrap md:flex-row flex-col items-start md:gap-x-5 gap-y-4 md:gap-y-4">
          {addressList.length > 0 &&
            addressList.map((address) => (
              <div
                key={address?._id}
                className=" capitalize border border-BORDERGRAY rounded-md p-3 text-BLACK space-y-2 text-left md:w-2/5 w-full min-h-[13rem]"
              >
                <p className="font-semibold text-lg capitalize">
                  {address?.fname}
                </p>
                <p className="font-normal capitalize">{address?.lname}</p>
                <p className="font-normal">
                  <span>{address?.location},</span>
                  <span>{address?.state},</span>{" "}
                  <span>{address?.postalCode},</span>{" "}
                  <span>{address?.country}</span>
                </p>
                <p className="font-normal">{address?.phone}</p>
                <p className="flex items-center gap-x-3">
                  <span
                    role="button"
                    className="text-PRIMARY"
                    onClick={() => {
                      setShowEditAddres(true);
                      setAddressId(address?._id);
                    }}
                  >
                    Edit
                  </span>{" "}
                  <button
                    type="button"
                    onClick={() => {
                      handleDeleteAddress(address?._id);
                      setAddressId(address?._id);
                    }}
                    className="text-red-400"
                    disabled={loading || deleteLoading}
                  >
                    {deleteLoading && address?._id === addressId
                      ? "Deleting..."
                      : "Delete"}
                  </button>
                </p>
              </div>
            ))}
          <div
            onClick={() => setShowNewAddress(true)}
            className="border cursor-pointer border-BORDERGRAY rounded-md text-BLACK gap-y-2 text-center md:w-2/5 w-full min-h-[13rem] flex flex-col items-center justify-center"
          >
            <AiOutlinePlusCircle className="h-10 w-10 text-TEXTGRAY block" />
            <p className="font-semibold text-TEXTGRAY">Add new address</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Address;
