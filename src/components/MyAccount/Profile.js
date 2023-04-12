import React, { useState } from "react";
import EditProfile from "./EditProfile";

const Profile = () => {
  const [showEditProfile, setShowEditProfile] = useState(false);
  return (
    <>
      {showEditProfile ? (
        <EditProfile setShowEditProfile={setShowEditProfile} />
      ) : (
        <div className="bg-white w-full border border-BORDERGRAY p-5 md:space-y-5 space-y-3 ">
          <p className="flex items-center w-full text-lg">
            <span className="font-bold md:w-60 w-40">First name:</span>{" "}
            <span className="font-normal capitalize">John</span>
          </p>
          <p className="flex items-center w-full text-lg">
            <span className="font-bold md:w-60 w-40">Last name:</span>{" "}
            <span className="font-normal capitalize">Adam</span>
          </p>
          <p className="flex items-center w-full text-lg">
            <span className="font-bold md:w-60 w-40">Company name:</span>{" "}
            <span className="font-normal capitalize">Loys wood</span>
          </p>
          <p className="flex items-center w-full text-lg">
            <span className="font-bold md:w-60 w-40">Location:</span>{" "}
            <span className="font-normal capitalize">4127 State Street</span>
          </p>
          <p className="flex items-center w-full text-lg">
            <span className="font-bold md:w-60 w-40">City:</span>{" "}
            <span className="font-normal capitalize">Southfield:</span>
          </p>
          <p className="flex items-center w-full text-lg">
            <span className="font-bold md:w-60 w-40">Country:</span>{" "}
            <span className="font-normal capitalize">United States</span>
          </p>
          <p className="flex items-center w-full text-lg">
            <span className="font-bold md:w-60 w-40">Phone:</span>{" "}
            <span className="font-normal">+1 313-940-6412</span>
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
