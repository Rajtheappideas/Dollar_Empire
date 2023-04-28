import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { handleChangePassword } from "../../redux/BasicFeatureSlice";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

const ChangePassword = () => {
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    ConfirmPassword: "",
    showOldPassword: false,
    showNewPassword: false,
  });

  const { loading } = useSelector((state) => state.basicFeatures);
  const { token } = useSelector((state) => state.Auth);

  const dispatch = useDispatch();

  const AbortControllerRef = useRef(null);

  const changePassword = (e) => {
    e.preventDefault();
    toast.dismiss();
    if (
      Object.values(passwords)
        .map((v) => v === "")
        .includes(true)
    ) {
      return toast.error("All fields required!!!", { duration: "5000" });
    }
    if (passwords.ConfirmPassword !== passwords.newPassword) {
      return toast.error("NewPassword doesn't match with Confirmpassword!!!");
    }
    if (passwords.oldPassword === passwords.newPassword) {
      return toast.error("NewPassword should not be same as Oldpassword!!!", {
        duration: "5000",
      });
    }
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(
        passwords.newPassword
      )
    ) {
      return toast.error(
        "New passwor Must Contain 8 Characters, 1 Uppercase, 1 Lowercase, 1 Number and 1 Special Case Character",
        { duration: "5000" }
      );
    }
    const response = dispatch(
      handleChangePassword({
        oldPassword: passwords.oldPassword,
        newPassword: passwords.newPassword,
        token,
        signal: AbortControllerRef,
      })
    );
    if (response) {
      response.then((res) => {
        if (res.payload.status === "success") {
          toast.success("Password Change Successfully.");
          setPasswords({
            ConfirmPassword: "",
            newPassword: "",
            oldPassword: "",
          });
        } else if (res.payload.message === "Password incorrect.") {
          toast.error("Old Password is incorrect!!!");
        } else {
          toast.error(res.payload.message);
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
    <form
      onSubmit={(e) => changePassword(e)}
      className="bg-white border border-BORDERGRAY space-y-4 p-5 w-full"
    >
      {/* current password */}
      <div className="relative z-0 space-y-3">
        <label className="text-black font-medium block text-left text-lg">
          Current Password
        </label>
        <input
          type={passwords?.showOldPassword ? "text" : "password"}
          className="bg-LIGHTGRAY outline-none lg:w-[82%] w-full text-black placeholder:text-gray-400 rounded-md p-3"
          placeholder="old password"
          name="old password"
          value={passwords.oldPassword}
          onChange={(e) =>
            setPasswords({ ...passwords, oldPassword: e.target.value })
          }
        />
        {passwords?.showOldPassword ? (
          <BsEyeFill
            role="button"
            className="h-7 w-7 absolute top-9 right-44"
            onClick={() =>
              setPasswords({ ...passwords, showOldPassword: false })
            }
          />
        ) : (
          <BsEyeSlashFill
            role="button"
            className="h-7 w-7 absolute top-9 right-44"
            onClick={() =>
              setPasswords({ ...passwords, showOldPassword: true })
            }
          />
        )}
      </div>

      {/* new password */}
      <div className="space-y-3 relative z-0">
        <label className="text-black font-medium block text-left text-lg">
          New Password
        </label>
        <input
          type={passwords?.showNewPassword ? "text" : "password"}
          className="bg-LIGHTGRAY outline-none lg:w-[82%] w-full text-black placeholder:text-gray-400 rounded-md p-3"
          placeholder="new password"
          name="new password"
          value={passwords.newPassword}
          onChange={(e) =>
            setPasswords({ ...passwords, newPassword: e.target.value })
          }
        />
        {passwords?.showNewPassword ? (
          <BsEyeFill
            role="button"
            className="h-7 w-7 absolute top-9 right-44"
            onClick={() =>
              setPasswords({ ...passwords, showNewPassword: false })
            }
          />
        ) : (
          <BsEyeSlashFill
            role="button"
            className="h-7 w-7 absolute top-9 right-44"
            onClick={() =>
              setPasswords({ ...passwords, showNewPassword: true })
            }
          />
        )}
      </div>
      {/* Confirm New Password */}
      <>
        <label className="text-black font-medium block text-left text-lg">
          Confirm New Password
        </label>
        <input
          type="password"
          className="bg-LIGHTGRAY outline-none lg:w-[82%] w-full text-black placeholder:text-gray-400 rounded-md p-3"
          placeholder="Confirm New Password"
          name="confirm password"
          value={passwords.ConfirmPassword}
          onChange={(e) =>
            setPasswords({ ...passwords, ConfirmPassword: e.target.value })
          }
        />
      </>

      {/* btns */}
      <div className="flex w-full items-center gap-x-3">
        <button
          type="submit"
          className="w-40 font-semibold bg-PRIMARY text-white rounded-md text-center p-3 active:scale-90 hover:text-PRIMARY hover:bg-white border border-PRIMARY duration-300"
          disabled={loading}
        >
          {loading ? "Processing..." : "Save"}
        </button>
        <button
          type="button"
          className="w-40 font-semibold bg-gray-200 text-black rounded-md text-center p-3 active:scale-90 hover:text-white hover:bg-black border border-gray-400 duration-300"
          onClick={() =>
            setPasswords({
              ConfirmPassword: "",
              newPassword: "",
              oldPassword: "",
            })
          }
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ChangePassword;
