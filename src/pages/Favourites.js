import React, { useRef } from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { handleGetUserFavourites } from "../redux/FavouriteSlice";
import Favourite from "../components/Favourite";
import FavouriteForMobile from "../components/FavouriteForMobile";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Favourites = () => {
  const { t } = useTranslation();

  const { token } = useSelector((state) => state.Auth);

  const { favourites, loading } = useSelector((state) => state.favourite);

  const dispatch = useDispatch();

  const AbortControllerRef = useRef(null);

  useEffect(() => {
    dispatch(handleGetUserFavourites({ token }));
    return () => {
      AbortControllerRef.current !== null && AbortControllerRef.current.abort();
    };
  }, []);

  return (
    <>
      <Helmet title={t("Favourites")} />
      <section className="bg-BACKGROUNDGRAY w-full lg:pb-20 pb-10">
        <div className="container mx-auto space_for_div space-y-5 w-full bg-BACKGROUNDGRAY lg:pb-20 pb-10">
          <h1 className="block font-semibold md:text-4xl text-2xl text-left py-1">
            {t("Your Favourites")}
          </h1>

          {/* table  desk & tablet*/}
          <div className="w-full hidden md:inline-block xl:overflow-hidden overflow-x-scroll scrollbar">
            <table className="w-full">
              <thead className="bg-PRIMARY text-white p-2 w-full">
                <tr>
                  <th className="w-40 lg:p-3 p-2 font-semibold text-left text-base">
                    {t("Image")}
                  </th>
                  <th className="lg:min-w-[20rem] min-w-[10rem] lg:p-3 p-2 font-semibold text-left text-base">
                    {t("Product")}
                  </th>
                  <th className="xl:min-w-[5rem] md:min-w-[8rem] min-w-[5rem] lg:p-3 p-2 font-semibold text-left text-base">
                    {t("Item no")}.
                  </th>
                  <th className="lg:p-3 p-2 font-semibold text-center text-base">
                    {t("Packing")}
                  </th>
                  <th className="text-left min-w-[5rem]">{t("Remove")}</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td
                      className="font-semibold md:text-3xl text-xl text-center mx-auto p-3 w-full"
                      colSpan="100%"
                    >
                      <Skeleton
                        className="w-full md:h-40 h-28 mb-2"
                        baseColor="lightgray"
                        highlightColor="white"
                        borderRadius="10px"
                        duration={0.8}
                      />
                      <Skeleton
                        className="w-full md:h-40 h-28 mb-2"
                        baseColor="lightgray"
                        highlightColor="white"
                        borderRadius="10px"
                        duration={0.8}
                      />
                      <Skeleton
                        className="w-full md:h-40 h-28"
                        baseColor="lightgray"
                        highlightColor="white"
                        borderRadius="10px"
                        duration={0.8}
                      />
                    </td>
                  </tr>
                ) : favourites.length === 0 ? (
                  <tr>
                    <td
                      className="font-semibold md:text-3xl text-xl text-center mx-auto p-3 w-full"
                      colSpan="100%"
                    >
                      {t("No Favourites here")}.
                    </td>
                  </tr>
                ) : (
                  favourites.map((favourite) => (
                    <tr
                      className="bg-white font-normal text-base border-b border-gray-200"
                      key={favourite?._id}
                    >
                      <Favourite favourite={favourite} />
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {/* for mobile table */}
          <div className="w-full overflow-hidden md:hidden">
            <table className="flex flex-row bg-white">
              <tbody className="flex flex-col">
                {loading ? (
                  <tr>
                    <td
                      className="font-semibold md:text-3xl text-xl text-center mx-auto p-3 w-full"
                      colSpan="100%"
                    >
                    {t("loading").concat("...")}
                    </td>
                  </tr>
                ) : favourites.length === 0 ? (
                  <tr>
                    <td
                      className="font-semibold md:text-3xl text-xl text-center mx-auto p-3 w-full"
                      colSpan="100%"
                    >
                      {t("No Favourites here")}.
                    </td>
                  </tr>
                ) : (
                  favourites.map((favourite) => (
                    <FavouriteForMobile
                      key={favourite?._id}
                      favourite={favourite}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default Favourites;
