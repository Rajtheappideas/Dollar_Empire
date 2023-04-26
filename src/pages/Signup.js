import React, { useRef } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  isPossiblePhoneNumber,
  isValidPhoneNumber,
} from "react-phone-number-input";
import { useFormik, Form, FormikProvider, ErrorMessage } from "formik";
import * as yup from "yup";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { handleRegisterUser } from "../redux/AuthSlice";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { handleSuccess } from "../redux/GlobalStates";

const Signup = () => {
  const { user, loading, error } = useSelector((state) => state.Auth);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const AbortControllerRef = useRef(null);

  const SignupSchema = yup.object().shape({
    email: yup.string().required("email is required").email(),
    fname: yup
      .string()
      .trim("The contact name cannot include leading and trailing spaces")
      .required("firstname is required")
      .min(3, "too short")
      .max(30, "too long")
      .matches(
        /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/g,
        "only contain Latin letters."
      ),
    lname: yup
      .string()
      .trim("The contact name cannot include leading and trailing spaces")
      .required("lastname is required")
      .min(2, "too short")
      .max(30, "too long")
      .matches(
        /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/g,
        "only contain Latin letters."
      ),
    address: yup
      .string()
      .required("address is required")
      .matches(/^[0-9A-Za-z\s\-]+$/g, "That doesn't look Address")
      .trim("The contact name cannot include leading and trailing spaces"),
    postalCode: yup
      .string()
      .typeError("That doesn't look like a postal code")
      .required("postalcode is required")
      .max(6, "Pincode should be 6 characters")
      .min(6, "Pincode should be 6 characters")
      .matches(/^[0-9A-Za-z\s\-]+$/g, "That doesn't look like a postal code"),
    city: yup
      .string()
      .required("city is required")
      .trim("The contact name cannot include leading and trailing spaces")
      .matches(
        /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/g,
        "only contain Latin letters."
      ),
    state: yup
      .string()
      .required("state is required")
      .trim("The contact name cannot include leading and trailing spaces")
      .matches(
        /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/g,
        "only contain Latin letters."
      ),
    companyName: yup
      .string()
      .required("companyName is required")
      .trim("The contact name cannot include leading and trailing spaces")
      .matches(
        /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/g,
        "only contain Latin letters."
      ),
    country: yup
      .string()
      .required("country is required")
      .trim("The contact name cannot include leading and trailing spaces")
      .matches(
        /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/g,
        "only contain Latin letters."
      ),
    password: yup
      .string()
      .trim("The contact name cannot include leading and trailing spaces")
      .required("password is required")
      .min(
        6,
        "Password should be 8 chars minimum with at least 1 uppercase, 1 lowercase, 1 number."
      )
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
        "Password should be 8 chars minimum with at least 1 uppercase, 1 lowercase, 1 number."
      ),
    phone: yup
      .string()
      .required("A phone number is required")
      .trim("The contact name cannot include leading and trailing spaces"),
    checkBox: yup.bool().oneOf([true], "Please Check the box."),
  });

  const formik = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      email: "",
      companyName: "",
      password: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
      checkBox: false,
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      if (
        isPossiblePhoneNumber(values.phone) &&
        isValidPhoneNumber(values.phone)
      ) {
        const response = dispatch(
          handleRegisterUser({
            fname: values.fname,
            lname: values.lname,
            email: values.email,
            companyName: values.companyName,
            password: values.password,
            phone: values.phone,
            address: values.address,
            city: values.city,
            state: values.state,
            country: values.country,
            postalCode: values.postalCode,
            signal: AbortControllerRef,
          })
        );
        if (response) {
          response.then((res) => {
            if (res.payload.status === "success") {
              dispatch(handleSuccess());
              navigate("/");
              toast.success("Sign up successfully.");
            } else {
              toast.error(res.payload.message);
            }
          });
        }
      } else {
        toast.error("Phone number is invalid!!!");
      }
    },
  });

  const { getFieldProps, handleSubmit, setFieldValue } = formik;

  useEffect(() => {
    if (user !== null) {
      navigate("/");
      toast.success("Already Logged in.");
    }
    return () => {
      AbortControllerRef.current !== null && AbortControllerRef.current.abort();
    };
  }, []);
  return (
    <>
      <Helmet title="Sign-in" />
      <div className="p-4 mx-auto xl:w-2/5 lg:w-1/2 md:w-2/3 w-11/12 h-auto space-y-4 md:my-14 my-7 rounded-lg border border-BORDERGRAY">
        <h1 className="font-semibold md:text-3xl text-xl text-left">
          Customer Register
        </h1>
        <hr />
        <FormikProvider value={formik}>
          <Form
            autoComplete="off"
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {/* first & last name */}
            <div className="flex items-start w-full gap-x-3">
              <div className="w-1/2 space-y-3">
                <label className="text-black font-medium block text-left text-lg">
                  First name*
                </label>
                <input
                  type="text"
                  className="outline-none bg-LIGHTGRAY w-full text-black placeholder:text-gray-400 rounded-md p-3"
                  placeholder="First name"
                  name="fname"
                  {...getFieldProps("fname")}
                />
                <ErrorMessage name="fname" component={TextError} />
              </div>
              <div className="w-1/2 space-y-3">
                <label className="text-black font-medium block text-left text-lg">
                  Last name*
                </label>
                <input
                  type="text"
                  className="outline-none bg-LIGHTGRAY w-full text-black placeholder:text-gray-400 rounded-md p-3"
                  placeholder="Last name"
                  name="lname"
                  {...getFieldProps("lname")}
                />
                <ErrorMessage name="lname" component={TextError} />
              </div>
            </div>
            {/* country */}
            <>
              <label className="text-black font-medium block text-left text-lg">
                Country*
              </label>
              <input
                type="text"
                className=" outline-none bg-LIGHTGRAY w-full text-black placeholder:text-gray-400 rounded-md p-3"
                placeholder="United states"
                name="country"
                {...getFieldProps("country")}
              />
              <ErrorMessage name="country" component={TextError} />
            </>
            {/* company name */}
            <>
              <label className="text-black font-medium block text-left text-lg">
                Company name*
              </label>
              <input
                type="text"
                className="outline-none bg-LIGHTGRAY w-full text-black placeholder:text-gray-400 rounded-md p-3"
                placeholder="Type here..."
                name="companyName"
                {...getFieldProps("companyName")}
              />
              <ErrorMessage name="companyName" component={TextError} />
            </>
            {/* address */}
            <>
              <label className="text-black font-medium block text-left text-lg">
                Address*
              </label>
              <input
                type="text"
                className="outline-none bg-LIGHTGRAY w-full text-black placeholder:text-gray-400 rounded-md p-3"
                placeholder="Type here..."
                name="address"
                {...getFieldProps("address")}
              />
              <ErrorMessage name="address" component={TextError} />
            </>
            {/* city */}
            <>
              <label className="text-black font-medium block text-left text-lg">
                City*
              </label>
              <input
                type="text"
                className="outline-none bg-LIGHTGRAY w-full text-black placeholder:text-gray-400 rounded-md p-3"
                placeholder="Type here..."
                name="city"
                {...getFieldProps("city")}
              />
              <ErrorMessage name="city" component={TextError} />
            </>
            {/* state & postal code */}
            <div className="flex items-start w-full gap-x-3">
              <div className="w-1/2">
                <label className="text-black font-medium block text-left text-lg">
                  State*
                </label>
                <input
                  type="text"
                  className="outline-none bg-LIGHTGRAY w-full text-black placeholder:text-gray-400 rounded-md p-3"
                  placeholder="Type here..."
                  name="state"
                  {...getFieldProps("state")}
                />
                <ErrorMessage name="state" component={TextError} />
              </div>
              <div className="w-1/2">
                <label className="text-black font-medium block text-left text-lg">
                  Postal code*
                </label>
                <input
                  type="number"
                  className="outline-none bg-LIGHTGRAY w-full text-black placeholder:text-gray-400 rounded-md p-3"
                  placeholder="Type here..."
                  name="postalCode"
                  maxLength={6}
                  minLength={6}
                  {...getFieldProps("postalCode")}
                />
                <ErrorMessage name="postalCode" component={TextError} />
              </div>
            </div>
            {/* phone */}
            <>
              <label className="text-black font-medium block text-left text-lg">
                Phone*
              </label>
              <PhoneInput
                country={"us"}
                countryCodeEditable={false}
                enableSearch={true}
                inputProps={{
                  name: "phone",
                }}
                onChange={(value) =>
                  setFieldValue("phone", "+".concat(value).trim())
                }
                inputStyle={{
                  width: "100%",
                  background: "#F5F5F5",
                  borderRadius: "6px",
                  border: "0px",
                  padding: "1.6rem 0 1.6rem 3rem",
                }}
                dropdownStyle={{ background: "lightgray" }}
                buttonStyle={{ border: "0px" }}
              />
              <ErrorMessage name="phone" component={TextError} />
            </>
            {/* email */}
            <>
              <label className="text-black font-medium block text-left text-lg">
                Email*
              </label>
              <input
                type="email"
                className="outline-none bg-LIGHTGRAY w-full text-black placeholder:text-gray-400 rounded-md p-3"
                placeholder="Email"
                name="email"
                {...getFieldProps("email")}
              />
              <ErrorMessage name="email" component={TextError} />
            </>
            {/*password  */}
            <>
              <label className="text-black font-medium block text-left text-lg">
                Password
              </label>
              <input
                type="password"
                className="outline-none bg-LIGHTGRAY w-full text-black placeholder:text-gray-400 rounded-md p-3"
                placeholder="Password"
                name="password"
                {...getFieldProps("password")}
              />
              <ErrorMessage name="password" component={TextError} />
            </>
            {/* checkbox */}
            <div>
              <p className="flex items-start gap-x-2">
                <input
                  type="checkbox"
                  className="outline-none w-8 h-8 rounded-md border inline-block mt-1"
                  name="checkBox"
                  {...getFieldProps("checkBox")}
                  onChange={(e) => {
                    setFieldValue("checkBox", e.target.checked);
                  }}
                />
                <span>
                  Accept Lorem Ipsum is simply dummy text of the printing and
                  type lorem is setting industry.
                </span>
              </p>
              {formik.errors.checkBox && (
                <ErrorMessage name="checkBox" component={TextError} />
              )}
            </div>
            {/* btn */}
            <button
              type="submit"
              className="bg-PRIMARY active:translate-y-2 hover:text-PRIMARY hover:bg-white border border-PRIMARY duration-300 p-3 text-white text-center w-40 rounded-md font-semibold"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </Form>
        </FormikProvider>

        {/* btn signin */}
        <p className="font-semibold text-center text-lg py-5">
          Already have an account?&nbsp;
          <Link to="/sign-in" className="underline text-blue-400">
            Login
          </Link>
        </p>
      </div>
    </>
  );
};

export default Signup;

const TextError = styled.span`
  color: red !important;
  font-weight: 600;
  padding-top: 10px;
  font-size: 1rem;
`;
