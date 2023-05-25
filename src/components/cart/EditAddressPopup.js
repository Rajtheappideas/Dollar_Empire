import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useRef } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useDispatch, useSelector } from "react-redux";
import {
  isPossiblePhoneNumber,
  isValidPhoneNumber,
} from "react-phone-number-input";
import { useFormik, Form, FormikProvider, ErrorMessage } from "formik";
import * as yup from "yup";
import styled from "styled-components";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { handlePostEditAddress } from "../../redux/FeatureSlice";
import { handleGetAddresses } from "../../redux/GetContentSlice";
import { Country, State, City } from "country-state-city";
import { useTranslation } from "react-i18next";

const EditAddressPopup = ({ setShowPopup, addressId }) => {
  const [selectedData, setSelectedData] = useState({
    state: "",
    city: "",
  });
  const [allCountries, setAllCountries] = useState("");
  const [country, setCountry] = useState("");

  const { addressList, user } = useSelector((state) => state.getContent);
  const { loading } = useSelector((state) => state.features);
  const { token } = useSelector((state) => state.Auth);

  const findEditAddress = addressList.find(
    (address) => address?._id == addressId
  );
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const AbortControllerRef = useRef(null);

  const EditaddressSchema = yup.object().shape({
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
      .max(
        country === "United States" ? 5 : 6,
        country === "United States"
          ? "Pincode should be 5 characters"
          : "Pincode should be 6 characters"
      )
      .min(
        country === "United States" ? 5 : 6,
        country === "United States"
          ? "Pincode should be 5 characters"
          : "Pincode should be 6 characters"
      )
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
      fname: findEditAddress?.fname,
      lname: findEditAddress?.lname,
      location: findEditAddress?.location,
      companyName: findEditAddress?.companyName,
      phone: findEditAddress?.phone,
      city: findEditAddress?.city,
      state: findEditAddress?.state,
      country: findEditAddress?.country,
      postalCode: findEditAddress?.postalCode,
    },
    validationSchema: EditaddressSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (
        isPossiblePhoneNumber(values.phone) &&
        isValidPhoneNumber(values.phone)
      ) {
        const response = dispatch(
          handlePostEditAddress({
            fname: values.fname,
            lname: values.lname,
            companyName: values.companyName,
            phone: values.phone,
            city: values.city,
            state: values.state,
            country: values.country,
            location: values.location,
            postalCode: values.postalCode,
            signal: AbortControllerRef,
            token,
            id: addressId,
          })
        );
        if (response) {
          response.then((res) => {
            if (res?.meta?.arg?.signal?.current?.signal?.aborted) {
              toast.error("Request Cancelled.");
              resetForm();
            }
            if (res.payload.status === "success") {
              resetForm();
              setShowPopup(false);
              dispatch(handleGetAddresses({ token }));
              toast.success("Address edited successfully.");
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

  const { getFieldProps, handleSubmit, setFieldValue, resetForm, values } =
    formik;

  useEffect(() => {
    setAllCountries(Country.getAllCountries());

    return () => {
      AbortControllerRef.current !== null && AbortControllerRef.current.abort();
    };
  }, []);

  // for country , state , city selection
  useEffect(() => {
    const country = Country.getAllCountries().find(
      (country) =>
        country.name.toLocaleLowerCase() === values.country.toLocaleLowerCase()
    );
    setCountry(country?.name);
    const states = State.getStatesOfCountry(country?.isoCode);

    setSelectedData({ ...selectedData, state: states });
    const state = states.find(
      (state) =>
        state.name.toLocaleLowerCase() === values.state.toLocaleLowerCase()
    );
    const cities = City.getCitiesOfState(state?.countryCode, state?.isoCode);
    if (cities.length > 0) {
      setSelectedData({ ...selectedData, city: cities });
    }
  }, [values.country, values.state, values.city]);

  return (
    <div
      className={`absolute bg-black/30 z-50 w-full lg:min-h-[100rem] min-h-[120rem]  inset-0 backdrop-blur-sm`}
    >
      <div className="fixed overflow-hidden space-y-3 top-10 left-1/2 -translate-x-1/2 z-50 md:p-5 py-10 px-5 bg-white text-black lg:w-5/12 md:w-7/12 w-[95%] h-auto rounded-md">
        <div className="flex items-center justify-between w-full">
          <p className="font-semibold text-2xl">Shipping Address</p>
          <AiOutlineClose
            role="button"
            onClick={() => setShowPopup(false)}
            className="w-7 h-7 text-black"
          />
        </div>
        <hr className="w-full" />
        {/* form */}
        <FormikProvider value={formik}>
          <Form onSubmit={handleSubmit} className="space-y-3">
            {/* name */}
            <div className="flex items-start w-full gap-x-4">
              <div className=" w-1/2">
                <label className="text-black font-medium block text-left text-lg">
                  First name*
                </label>
                <input
                  type="text"
                  className="bg-LIGHTGRAY w-full text-black placeholder:text-gray-400 rounded-md p-3"
                  placeholder="First name"
                  name="fname"
                  {...getFieldProps("fname")}
                />
                <ErrorMessage name="fname" component={TextError} />
              </div>
              <div className=" w-1/2">
                <label className="text-black font-medium block text-left text-lg">
                  Last name*
                </label>
                <input
                  type="text"
                  className="bg-LIGHTGRAY w-full text-black placeholder:text-gray-400 rounded-md p-3"
                  placeholder="Last name"
                  name="lname"
                  {...getFieldProps("lname")}
                />
                <ErrorMessage name="lname" component={TextError} />
              </div>
            </div>{" "}
            {/* company name */}
            <>
              <label className="text-black font-medium block text-left text-lg">
                Company name*
              </label>
              <input
                type="text"
                className="bg-LIGHTGRAY w-full text-black placeholder:text-gray-400 rounded-md p-3"
                placeholder="Company name"
                name="companyName"
                {...getFieldProps("companyName")}
              />
              <ErrorMessage name="companyName" component={TextError} />
            </>
            {/* Country */}
            <>
              <label className="text-black font-medium block text-left text-lg">
                Country*
              </label>
              <select
                className=" outline-none bg-LIGHTGRAY w-full text-black placeholder:text-gray-400 rounded-md p-3"
                onChange={(e) =>
                  setSelectedData({ ...selectedData, country: e.target.value })
                }
                name="country"
                {...getFieldProps("country")}
              >
                <option value={values?.country}>{values.country}</option>
                {allCountries !== "" &&
                  allCountries.map((country) => (
                    <option key={country.name} value={country.name}>
                      {country?.name}
                    </option>
                  ))}
              </select>

              <ErrorMessage name="country" component={TextError} />
            </>
            {/* state */}
            <>
              <label className="text-black font-medium block text-left text-lg">
                State*
              </label>
              <select
                className=" outline-none bg-LIGHTGRAY w-full text-black placeholder:text-gray-400 rounded-md p-3"
                name="state"
                {...getFieldProps("state")}
              >
                <option label={values?.state}>{values?.state}</option>
                {selectedData?.state.length > 0 &&
                  selectedData.state.map((state) => (
                    <option key={state.name} value={state.name}>
                      {state?.name}
                    </option>
                  ))}
              </select>
              <ErrorMessage name="state" component={TextError} />
            </>
            {/* city */}
            <div className="flex items-start w-full gap-x-3">
              <div className="w-1/2">
                <label className="text-black font-medium block text-left text-lg">
                  {t("City")}*
                </label>
                {/* <input
                  type="text"
                  className="outline-none bg-LIGHTGRAY w-full text-black placeholder:text-gray-400 rounded-md p-3"
                  placeholder={t("City")}
                  name="city"
                  {...getFieldProps("city")}
                /> */}
                <select
                  className=" outline-none bg-LIGHTGRAY w-full text-black placeholder:text-gray-400 rounded-md p-3"
                  name="city"
                  {...getFieldProps("city")}
                >
                  <option label={values?.city}>{values?.city}</option>
                  {selectedData?.city.length > 0 &&
                    selectedData.city.map((city) => (
                      <option key={city.name} value={city.name}>
                        {city?.name}
                      </option>
                    ))}
                </select>
                <ErrorMessage name="city" component={TextError} />
              </div>
              <div className="w-1/2">
                <label className="text-black font-medium block text-left text-lg">
                  {t("Postal code")}*
                </label>
                <input
                  type="number"
                  className="outline-none bg-LIGHTGRAY w-full text-black placeholder:text-gray-400 rounded-md p-3"
                  placeholder={t("Postal code")}
                  name="postalCode"
                  maxLength={6}
                  minLength={5}
                  {...getFieldProps("postalCode")}
                />
                <ErrorMessage name="postalCode" component={TextError} />
              </div>
            </div>
            {/* location */}
            <>
              <label className="text-black font-medium block text-left text-lg">
                Location*
              </label>
              <input
                type="text"
                className="bg-LIGHTGRAY w-full text-black placeholder:text-gray-400 rounded-md p-3"
                placeholder="Location"
                name="location"
                {...getFieldProps("location")}
              />
              <ErrorMessage name="location" component={TextError} />
            </>
            {/* phone */}
            <div className="w-full">
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
                value={values.phone}
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
                className="w-40 font-semibold bg-gray-300 text-black rounded-md text-center p-3 active:translate-y-2 hover:text-white hover:bg-black border border-gray-400 duration-300"
                onClick={() => setShowPopup(false)}
              >
                Close
              </button>
            </div>
          </Form>
        </FormikProvider>
      </div>
    </div>
  );
};

export default EditAddressPopup;

const TextError = styled.span`
  color: red !important;
  font-weight: 600;
  font-size: 1rem;
`;
