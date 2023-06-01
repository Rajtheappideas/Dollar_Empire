import React, { useRef, useState } from "react";
import {
  useFormik,
  Form,
  FormikProvider,
  ErrorMessage,
  validateYupSchema,
} from "formik";
import * as yup from "yup";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Country, State, City } from "country-state-city";
import valid from "card-validator";
import {
  handleChangeOrderId,
  handleCreateOrUpdateCard,
  handleCreateOrder,
  handleGetCard,
} from "../../redux/OrderSlice";
import { useNavigate } from "react-router-dom";
import { handleChangeActiveComponent } from "../../redux/GlobalStates";
import { handleClearCart } from "../../redux/CartSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment/moment";

const CardDetails = ({ summaryFixed }) => {
  const [selectedData, setSelectedData] = useState({
    state: "",
    city: "",
  });
  const [allCountries, setAllCountries] = useState("");
  const [confirmOrderLoading, setConfirmOrderLoading] = useState(false);
  const [country, setCountry] = useState("");

  const { token } = useSelector((state) => state.Auth);
  const { grandTotal } = useSelector((state) => state.cart);
  const {
    cardDetails,
    loading,
    shippingAddressId,
    shipphingMethod,
    paymentOption,
    orderId,
  } = useSelector((state) => state.orders);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { t } = useTranslation();

  const AbortControllerRef = useRef(null);

  const creditCardSchema = yup.object().shape({
    nameOnCard: yup
      .string()
      .trim("The contact name cannot include leading and trailing spaces")
      .required("firstname is required")
      .min(3, "too short")
      .max(40, "too long")
      .matches(
        /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/g,
        "only contain Latin letters."
      ),
    street: yup
      .string()
      .required("address is required")
      .matches(/^[0-9A-Za-z\s\-]+$/g, "That doesn't look Address")
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
      .matches(
        /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/g,
        "only contain Latin letters."
      )
      .typeError("State contain only string And it's required!!!"),
    country: yup
      .string()
      .required("country is required")
      .matches(
        /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/g,
        "only contain Latin letters."
      ),
    expiry: yup
      .string()
      .required("Expiration date is required")
      .test(
        "test-date",
        "Expiration Date is invalid",
        (value) =>
          valid.expirationDate(
            `${moment(values.expiry).year().toString()}-${(
              moment(values.expiry).month() + 1
            ).toString()}`
          ).isValid
      ),
    cardNumber: yup
      .number()
      .test(
        "test-number",
        "Credit Card number is invalid",
        (value) => valid.number(value).isValid
      )
      .required("Card number is required"),
    cvv: yup
      .string()
      .test("test-cvv", "CVV is invalid", (value) => valid.cvv(value).isValid)
      .required("CVV is required"),
  });

  const formik = useFormik({
    initialValues: {
      nameOnCard: "",
      street: "",
      city: "",
      state: selectedData.state,
      country: country === "" ? "United States" : country,
      postalCode: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
    },
    validationSchema: creditCardSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      setConfirmOrderLoading(true);
      if (shippingAddressId === "") {
        toast.dismiss();
        return toast.error("Please select the shipping address!!!");
      } else if (shipphingMethod === "") {
        toast.dismiss();
        return toast.error("Please select the shipping method!!!");
      } else if (paymentOption === "") {
        toast.dismiss();
        return toast.error("Please choose the Payment option!!!");
      }

      const response = dispatch(
        handleCreateOrUpdateCard({
          nameOnCard: values.nameOnCard,
          street: values.street,
          city: values.city,
          state: values.state,
          country: values.country,
          cardNumber: values.cardNumber,
          expiry: values.expiry,
          cvv: values.cvv,
          postalCode: values.postalCode,
          signal: AbortControllerRef,
          token,
        })
      );
      if (response) {
        response
          .then((res) => {
            if (res?.meta?.arg?.signal?.current?.signal?.aborted) {
              toast.dismiss();
              toast.error("Request Cancelled.");
            }
            if (res.payload.status === "success") {
              toast.success("Card Details Saved successfully.", {
                duration: 2000,
              });
            } else {
              return toast.error(res.payload.message);
            }
          })
          .then(() => {
            const response = dispatch(
              handleCreateOrder({
                token,
                signal: AbortControllerRef,
                shippingMethod: shipphingMethod,
                shippingAddress: shippingAddressId,
                paymentMethod: paymentOption,
                orderId: orderId,
              })
            );
            if (response) {
              response.then((res) => {
                if (res?.meta?.arg?.signal?.current?.signal?.aborted) {
                  toast.dismiss();
                  return toast.error("Request Cancelled.");
                }
                if (res.payload.status === "success") {
                  setConfirmOrderLoading(false);
                  toast.success("Order Submitted successfully.");
                  dispatch(handleChangeActiveComponent("Success"));
                  dispatch(handleClearCart());
                } else {
                  setConfirmOrderLoading(false);
                  return toast.error(res.payload.message);
                }
              });
            }
          });
      }
    },
  });

  const { getFieldProps, handleSubmit, setFieldValue, values, resetForm } =
    formik;

  useEffect(() => {
    setAllCountries(Country.getAllCountries());
    dispatch(handleGetCard({ token }));
    orderID(9);

    return () => {
      AbortControllerRef.current !== null && AbortControllerRef.current.abort();
    };
  }, []);

  // for country , state , city selection
  useEffect(() => {
    const country = Country.getAllCountries().find(
      (country) => country.name === values.country
    );
    setCountry(country?.name);
    const states = State.getStatesOfCountry(country?.isoCode);

    setSelectedData({ ...selectedData, state: states.map((s) => s.name) });
  }, [values.country]);

  function orderID(length) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    dispatch(handleChangeOrderId(result));
    return result;
  }
  return (
    <>
      <FormikProvider value={formik}>
        <Form
          autoComplete="off"
          onSubmit={handleSubmit}
          className="w-full flex xl:flex-row flex-col items-start justify-start gap-4 pb-10"
        >
          {loading && !confirmOrderLoading ? (
            <p className="text-2xl text-center font-semibold mx-auto">
              {t("loading")}...
            </p>
          ) : (
            <div className="xl:w-9/12 w-full space-y-3">
              <p className="bg-PRIMARY text-white p-4 w-full text-left font-semibold tracking-wide">
                {t("Card details")}
              </p>

              {/* name */}
              <>
                <label className="text-black font-medium block text-left text-lg">
                  {t("Name on card")}*
                </label>
                <input
                  type="text"
                  className="bg-LIGHTGRAY xl:w-1/2 w-full text-black placeholder:text-gray-400 rounded-md p-3"
                  placeholder={t("Name")}
                  name="nameOnCard"
                  {...getFieldProps("nameOnCard")}
                />
                <ErrorMessage name="nameOnCard" component={TextError} />
              </>
              {/* country*/}
              <>
                <label className="text-black font-medium block text-left text-lg">
                  {t("Country")}*
                </label>
                <select
                  className="bg-LIGHTGRAY xl:w-1/2 w-full text-black placeholder:text-gray-400 rounded-md p-3"
                  name="country"
                  {...getFieldProps("country")}
                  // onChange={(e) => setCountry(e.target.value.trim())}
                >
                  <option label="United States"></option>
                  {allCountries !== "" &&
                    allCountries.map((country, index) => (
                      <option key={index} value={country.name}>
                        {country?.name}
                      </option>
                    ))}
                </select>

                <ErrorMessage name="country" component={TextError} />
              </>
              {/* states */}
              <>
                <label className="text-black font-medium block text-left text-lg">
                  {t("State")}*
                </label>

                <select
                  className="bg-LIGHTGRAY xl:w-1/2 w-full text-black placeholder:text-gray-400 rounded-md p-3"
                  name="state"
                  {...getFieldProps("state")}
                >
                  <option label="Select state"></option>
                  {selectedData?.state.length > 0 &&
                    selectedData.state.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                </select>

                <ErrorMessage name="state" component={TextError} />
              </>
              {/* city */}
              <>
                <label className="text-black font-medium block text-left text-lg">
                  {t("City")}*
                </label>
                <input
                  className="bg-LIGHTGRAY xl:w-1/2 w-full text-black placeholder:text-gray-400 rounded-md p-3"
                  name="city"
                  type="text"
                  {...getFieldProps("city")}
                ></input>
                <ErrorMessage name="city" component={TextError} />
              </>

              {/* zip code  */}
              <>
                <label className="text-black font-medium block text-left text-lg">
                  {t("Postal code")}*
                </label>
                <input
                  type="number"
                  className="bg-LIGHTGRAY xl:w-1/2 w-full text-black placeholder:text-gray-400 rounded-md p-3"
                  placeholder={t("Postal code")}
                  name="postalCode"
                  maxLength={6}
                  minLength={5}
                  {...getFieldProps("postalCode")}
                />
                <ErrorMessage name="postalCode" component={TextError} />
              </>
              {/* street adress */}
              <>
                <label className="text-black font-medium block text-left text-lg">
                  {t("Street Address")}*
                </label>
                <input
                  type="text"
                  className="bg-LIGHTGRAY xl:w-1/2 w-full text-black placeholder:text-gray-400 rounded-md p-3"
                  placeholder="Type here..."
                  name="street"
                  {...getFieldProps("street")}
                />
                <ErrorMessage name="street" component={TextError} />
              </>
              {/* card number */}
              <>
                <label className="text-black font-medium block text-left text-lg">
                  {t("Card number")}*
                </label>
                <input
                  type="number"
                  className="bg-LIGHTGRAY xl:w-1/2 w-full text-black placeholder:text-gray-400 rounded-md p-3"
                  placeholder={t("Card number")}
                  name="cardNumber"
                  {...getFieldProps("cardNumber")}
                />
                <ErrorMessage name="cardNumber" component={TextError} />
              </>
              {/* date */}
              <>
                <label className="text-black font-medium block text-left text-lg">
                  {t("Expiration Date")}*
                </label>
                {/* <input
                  type="month"
                  datatype="MM/yyyy"
                  className="bg-LIGHTGRAY xl:w-1/2 w-full text-black placeholder:text-gray-400 rounded-md p-3"
                  {...getFieldProps("expiry")}
                  name="expiry"
                /> */}
                <DatePicker
                  selected={values.expiry}
                  onChange={(date) => {
                    setFieldValue("expiry", date);
                    // setexpireDate()
                  }}
                  dateFormat="MM/yyyy"
                  showMonthYearPicker
                  // {...getFieldProps("expiry")}
                  minDate={new Date()}
                  name="expiry"
                  className="bg-LIGHTGRAY xl:w-1/2 w-full text-black placeholder:text-gray-400 rounded-md p-3"
                />
                <ErrorMessage name="expiry" component={TextError} />
              </>
              {/* cvv */}
              <>
                <label className="text-black font-medium block text-left text-lg">
                  {t("CVV")}*
                </label>
                <input
                  type="number"
                  className="bg-LIGHTGRAY xl:w-1/2 w-full text-black placeholder:text-gray-400 rounded-md p-3"
                  placeholder="***"
                  {...getFieldProps("cvv")}
                  name="cvv"
                />
                <ErrorMessage name="cvv" component={TextError} />
              </>
            </div>
          )}
          {/* summary */}
          <div
            className={`xl:w-3/12 lg:w-1/3 md:w-1/2 w-full space-y-3 bg-BACKGROUNDGRAY text-BLACK p-3 border border-gray-300 ml-auto ${
              summaryFixed ? "xl:sticky top-2 right-10" : "static"
            }`}
          >
            <p className="font-semibold text-xl">{t("Order Summary")}</p>
            <hr className="w-full" />
            <p className="w-full flex items-center justify-between text-base">
              <span className="font-normal">{t("Subtotal")}</span>
              <span className="ml-auto font-semibold text-base">
                ${parseFloat(grandTotal).toFixed(2)}{" "}
              </span>{" "}
            </p>
            <p className="w-full flex items-center justify-between text-base">
              <span className="font-normal">{t("Freight")}</span>
              <span className="ml-auto font-semibold text-base">$10.00</span>
            </p>
            <hr className="w-full" />
            <p className="w-full flex items-center justify-between text-2xl font-bold">
              <span>{t("Grand Total")}</span>
              <span className="ml-auto">
                ${parseFloat(grandTotal).toFixed(2)}
              </span>{" "}
            </p>
            <hr className="w-full" />

            <button
              type="submit"
              className="font-semibold bg-PRIMARY text-white hover:bg-white hover:text-PRIMARY border border-PRIMARY duration-300 ease-in-out w-full p-3 text-center"
              disabled={confirmOrderLoading || loading}
            >
              {confirmOrderLoading
                ? t("Submitting Order").concat("...")
                : t("Confirm Order")}
            </button>
          </div>
        </Form>
      </FormikProvider>
    </>
  );
};

export default CardDetails;

const TextError = styled.span`
  color: red !important;
  font-weight: 600;
  font-size: 1rem;
  display: block;
`;
