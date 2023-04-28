import React, { useState } from "react";
import EditProfile from "./EditProfile";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { handleUserProfile } from "../../redux/GetContentSlice";

const Profile = () => {
  const [showEditProfile, setShowEditProfile] = useState(false);

  const { user, loading } = useSelector((state) => state.getContent);

  return (
    <>
      {showEditProfile ? (
        <EditProfile setShowEditProfile={setShowEditProfile} />
      ) : loading ? (
        <p className="font-semibold text-center md:text-3xl text-lg">
          Loading...
        </p>
      ) : (
        <div className="bg-white w-full border border-BORDERGRAY p-5 md:space-y-5 space-y-3 ">
          <p className="flex items-center w-full text-lg">
            <span className="font-bold md:w-60 w-40">First name:</span>{" "}
            <span className="font-normal capitalize">{user?.fname}</span>
          </p>
          <p className="flex items-center w-full text-lg">
            <span className="font-bold md:w-60 w-40">Last name:</span>{" "}
            <span className="font-normal capitalize">{user?.lname}</span>
          </p>
          <p className="flex items-center w-full text-lg">
            <span className="font-bold md:w-60 w-40">Email:</span>{" "}
            <span className="font-normal ">{user?.email}</span>
          </p>
          <p className="flex items-center w-full text-lg">
            <span className="font-bold md:w-60 w-40">Company name:</span>{" "}
            <span className="font-normal capitalize">{user?.companyName}</span>
          </p>
          <p className="flex items-center w-full text-lg">
            <span className="font-bold md:w-60 w-40">Location:</span>{" "}
            <span className="font-normal capitalize">{user?.address}</span>
          </p>
          <p className="flex items-center w-full text-lg">
            <span className="font-bold md:w-60 w-40">City:</span>{" "}
            <span className="font-normal capitalize">{user?.city}</span>
          </p>
          <p className="flex items-center w-full text-lg">
            <span className="font-bold md:w-60 w-40">State:</span>{" "}
            <span className="font-normal capitalize">{user?.state}</span>
          </p>
          <p className="flex items-center w-full text-lg">
            <span className="font-bold md:w-60 w-40">Country:</span>{" "}
            <span className="font-normal capitalize">{user?.country}</span>
          </p>
          <p className="flex items-center w-full text-lg">
            <span className="font-bold md:w-60 w-40">Phone:</span>{" "}
            <span className="font-normal">{user?.phone}</span>
          </p>
          <button
            type="button"
            className="bg-PRIMARY active:translate-y-2 hover:text-PRIMARY hover:bg-white border border-PRIMARY duration-300 p-3 text-white text-center w-60 rounded-md capitalize font-bold"
            onClick={() => setShowEditProfile(true)}
          >
            Edit Profile
          </button>
        </div>
      )}
    </>
  );
};

export default Profile;
