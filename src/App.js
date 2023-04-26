import { Suspense, lazy, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import Lottie from "lottie-react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ErrorFallback from "./components/ErrorFallback";
import PageNotFound from "./pages/PageNotFound";
import loading from "./assets/animations/loading.json";
import { useDispatch, useSelector } from "react-redux";
import ProductDetailPopup from "./components/ProductDetailPopup";
import { Toaster, toast } from "react-hot-toast";
import PrivateRoute from "./pages/PrivateRoute";
import {
  loginAllTabsEventListener,
  logoutAllTabsEventListener,
} from "./redux/GlobalStates";

const Home = lazy(() => import("./pages/Home"));
const PrivayPolicy = lazy(() => import("./pages/PrivayPolicy"));
const TermsAndCondition = lazy(() => import("./pages/TermsAndCondition"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Signin = lazy(() => import("./pages/Signin"));
const Signup = lazy(() => import("./pages/Signup"));
const Cart = lazy(() => import("./pages/Cart"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const ProductListing = lazy(() => import("./pages/ProductListing"));
const ShippingAndFreight = lazy(() => import("./pages/ShippingAndFreight"));
const MyAccount = lazy(() => import("./pages/MyAccount"));
const SpecialOrder = lazy(() => import("./pages/SpecialOrder"));
const Favourites = lazy(() => import("./pages/Favourites"));

function App() {
  const { showProductDetailsPopup } = useSelector(
    (state) => state.globalStates
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loginAllTabsEventListener());
    dispatch(logoutAllTabsEventListener());

    if (!window.navigator.onLine) {
      toast.error("Check your internet connection!!!", { duration: "5000" });
    }
  }, []);
  return (
    <BrowserRouter>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => {
          window.location.reload();
        }}
      >
        <Suspense
          fallback={
            <Lottie
              style={{
                pointerEvents: "none",
                height: "300px",
                width: "300px",
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen"
              animationData={loading}
              loop
            />
          }
        >
          <Toaster />
          {showProductDetailsPopup && <ProductDetailPopup />}
          <Header />
          <Routes>
            <Route path="/" element={<Home />} caseSensitive />
            <Route path="/about-us" element={<AboutUs />} caseSensitive />
            <Route path="/contact-us" element={<ContactUs />} caseSensitive />
            <Route
              path="/privacy-policy"
              element={<PrivayPolicy />}
              caseSensitive
            />
            <Route
              path="/terms-&-conditons"
              element={<TermsAndCondition />}
              caseSensitive
            />
            <Route path="/sign-in" element={<Signin />} caseSensitive />
            <Route path="/sign-up" element={<Signup />} caseSensitive />
            <Route
              path="/cart"
              element={
                <PrivateRoute>
                  <Cart />
                </PrivateRoute>
              }
              caseSensitive
            />
            <Route
              path="/product-listing"
              element={<ProductListing />}
              caseSensitive
            />
            <Route
              path="/favourites"
              element={
                <PrivateRoute>
                  <Favourites />
                </PrivateRoute>
              }
              caseSensitive
            />
            <Route
              path="/special-order"
              element={<SpecialOrder />}
              caseSensitive
            />
            <Route
              path="/forgot-password"
              element={<ForgotPassword />}
              caseSensitive
            />
            <Route
              path="/reset-password"
              element={<ResetPassword />}
              caseSensitive
              loader={() => <div>Loading...</div>}
            />
            <Route
              path="/my-account"
              element={
                <PrivateRoute>
                  <MyAccount />
                </PrivateRoute>
              }
              caseSensitive
            />
            <Route
              path="/shipping-&-freight"
              element={<ShippingAndFreight />}
              caseSensitive
            />
            <Route path="/*" element={<PageNotFound />} />
          </Routes>
          <Footer />
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
