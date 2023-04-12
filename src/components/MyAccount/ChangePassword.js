import React from "react";

const ChangePassword = () => {
  return (
    <div className="bg-white border border-BORDERGRAY space-y-5 p-5 w-full">
      {/* current password */}
      <>
        <label className="text-black font-medium block text-left text-lg">
          Current Password
        </label>
        <input
          type="password"
          className="bg-LIGHTGRAY lg:w-[82%] w-full text-black placeholder:text-gray-400 rounded-md p-3"
          placeholder="Company name"
        />
      </>

      {/* new password */}
      <>
        <label className="text-black font-medium block text-left text-lg">
          New Password
        </label>
        <input
          type="password"
          className="bg-LIGHTGRAY lg:w-[82%] w-full text-black placeholder:text-gray-400 rounded-md p-3"
          placeholder="new password"
        />
      </>
      {/* Confirm New Password */}
      <>
        <label className="text-black font-medium block text-left text-lg">
          Confirm New Password
        </label>
        <input
          type="password"
          className="bg-LIGHTGRAY lg:w-[82%] w-full text-black placeholder:text-gray-400 rounded-md p-3"
          placeholder="Confirm New Password"
        />
      </>

      {/* btns */}
      <div className="flex w-full items-center gap-x-3">
        <button
          type="button"
          className="w-40 font-semibold bg-PRIMARY text-white rounded-md text-center p-3 active:translate-y-2 hover:text-PRIMARY hover:bg-white border border-PRIMARY duration-300"
        >
          Save
        </button>
        <button
          type="button"
          className="w-40 font-semibold bg-gray-400 text-black rounded-md text-center p-3 active:translate-y-2 hover:text-white hover:bg-black border border-gray-400 duration-300"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;
