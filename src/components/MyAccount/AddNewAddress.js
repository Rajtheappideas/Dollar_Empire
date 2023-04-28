import React, { useRef } from "react";
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
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { handlePostNewAddress } from "../../redux/FeatureSlice";
import { handleGetAddresses } from "../../redux/GetContentSlice";

const AddNewAddress = ({ setShowNewAddress }) => {
  const { token } = useSelector((state) => state.Auth);
  const { loading } = useSelector((state) => state.features);

  const dispatch = useDispatch();

  const AbortControllerRef = useRef(null);

  const SignupSchema = yup.object().shape({
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
    location: yup
      .string()
      .required("location is required")
      .matches(/^[0-9A-Za-z\s\-]+$/g, "That doesn't look location")
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
    phone: yup
      .string()
      .required("A phone number is required")
      .trim("The contact name cannot include leading and trailing spaces"),
  });

  const formik = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      location: "",
      companyName: "",
      phone: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      if (
        isPossiblePhoneNumber(values.phone) &&
        isValidPhoneNumber(values.phone)
      ) {
        const response = dispatch(
          handlePostNewAddress({
            fname: values.fname,
            lname: values.lname,
            companyName: values.companyName,
            phone: values.phone,
            city: values.city,
            state: values.state,
            country: values.country,
            postalCode: values.postalCode,
            location: values.location,
            signal: AbortControllerRef,
            token,
          })
        );
        if (response) {
          response.then((res) => {
            if (res?.meta?.arg?.signal?.current?.signal?.aborted) {
              toast.error("Request Cancelled.");
            }
            if (res.payload.status === "success") {
              toast.success("Address added successfully.");
              resetForm();
              setShowNewAddress(false);
              dispatch(handleGetAddresses({ token }));
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

  const { getFieldProps, handleSubmit, setFieldValue, resetForm } = formik;

  useEffect(() => {
    return () => {
      AbortControllerRef.current !== null && AbortControllerRef.current.abort();
    };
  }, []);

  return (
    <FormikProvider value={formik}>
      <Form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="bg-white border border-BORDERGRAY space-y-4 p-5 w-full"
      >
        {/* name */}
        <div className="flex items-start w-full gap-x-3">
          <div className="lg:w-2/5 w-1/2 space-y-2">
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
          <div className="lg:w-2/5 w-1/2 space-y-2">
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
        {/* company name */}
        <>
          <label className="text-black font-medium block text-left text-lg">
            Company name*
          </label>
          <input
            type="text"
            className="bg-LIGHTGRAY outline-none lg:w-[82%] w-full text-black placeholder:text-gray-400 rounded-md p-3"
            placeholder="Company name"
            name="companyName"
            {...getFieldProps("companyName")}
          />
          <ErrorMessage
            name="companyName"
            className="block"
            component={TextError}
          />
        </>
        {/* location */}
        <>
          <label className="text-black font-medium block text-left text-lg">
            Location*
          </label>
          <input
            type="text"
            className="bg-LIGHTGRAY outline-none lg:w-[82%] w-full text-black placeholder:text-gray-400 rounded-md p-3"
            name="location"
            placeholder="Location"
            {...getFieldProps("location")}
          />
          <ErrorMessage
            name="location"
            className="block"
            component={TextError}
          />
        </>
        {/* city */}
        <div className="flex items-start w-full gap-x-3">
          <div className="lg:w-2/5 w-1/2 space-y-2">
            <label className="text-black font-medium block text-left text-lg">
              City*
            </label>
            <input
              type="text"
              className="bg-LIGHTGRAY outline-none w-full text-black placeholder:text-gray-400 rounded-md p-3"
              placeholder="City"
              name="city"
              {...getFieldProps("city")}
            />
            <ErrorMessage name="city" className="block" component={TextError} />
          </div>
          <div className="lg:w-2/5 w-1/2 space-y-2">
            <label className="text-black font-medium block text-left text-lg">
              State*
            </label>
            <input
              type="text"
              className="bg-LIGHTGRAY outline-none w-full text-black placeholder:text-gray-400 rounded-md p-3"
              name="state"
              placeholder="State"
              {...getFieldProps("state")}
            />
            <ErrorMessage name="state" component={TextError} />
          </div>
        </div>
        {/* Country */}
        <>
          <label className="text-black font-medium block text-left text-lg">
            Country*
          </label>
          <input
            type="text"
            className="bg-LIGHTGRAY outline-none lg:w-[82%] w-full text-black placeholder:text-gray-400 rounded-md p-3"
            name="country"
            placeholder="Country"
            {...getFieldProps("country")}
          />
          <ErrorMessage
            name="country"
            className="block"
            component={TextError}
          />
        </>
        {/* phone, postal code */}
        <div className="flex items-start w-full gap-x-3">
          <div className="lg:w-2/5 w-full space-y-2">
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
              value={formik.values.phone}
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
          </div>
          <div className="lg:w-2/5 w-full space-y-2">
            <label className="text-black font-medium block text-left text-lg">
              Postal Code*
            </label>
            <input
              type="number"
              maxLength={6}
              minLength={6}
              className="bg-LIGHTGRAY outline-none w-full text-black placeholder:text-gray-400 rounded-md p-3"
              placeholder="Postal code"
              name="postalCode"
              {...getFieldProps("postalCode")}
            />
            <ErrorMessage name="postalCode" component={TextError} />
          </div>
        </div>
        {/* btns */}
        <div className="flex w-full items-center gap-x-3">
          <button
            type="submit"
            className="w-40 font-semibold bg-PRIMARY text-white rounded-md text-center p-3 active:translate-y-2 hover:text-PRIMARY hover:bg-white border border-PRIMARY duration-300"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Save"}
          </button>
          <button
            type="button"
            className="w-40 font-semibold bg-gray-200 text-black rounded-md text-center p-3 active:translate-y-2 hover:text-white hover:bg-black border border-gray-400 duration-300"
            onClick={() => {
              loading
                ? AbortControllerRef.current.abort()
                : setShowNewAddress(false);
            }}
          >
            Cancel
          </button>
        </div>
      </Form>
    </FormikProvider>
  );
};

export default AddNewAddress;
const TextError = styled.span`
  color: red !important;
  font-weight: 600;
  font-size: 1rem;
`;
