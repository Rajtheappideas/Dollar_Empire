import React, { useState } from "react";
import SingleOrderHistory from "./SingleOrderHistory";

const OrderHIstory = () => {
  const [showSingleOrder, setShowSingleOrder] = useState(false);
  return (
    <div className="w-full overflow-x-scroll">
      {showSingleOrder ? (
        <SingleOrderHistory setShowSingleOrder={setShowSingleOrder} />
      ) : (
        <table className="w-full table-auto overflow-x-scroll">
          <thead>
            <tr className="w-full bg-PRIMARY text-white font-normal">
              <th className="text-center p-3">Order no.</th>
              <th className="text-center p-3">Type</th>
              <th className="text-center p-3">Order date</th>
              <th className="text-center p-3">Items</th>
              <th className="text-center p-3">Quantity</th>
              <th className="text-center p-3">Amount</th>
              <th className="text-center p-3">Tax</th>
              <th className="text-center p-3">Total</th>
            </tr>
          </thead>
          <tbody className="bg-white text-BLACK text-base">
            <tr className="text-center">
              <td
                onClick={() => setShowSingleOrder(true)}
                className="px-3 py-5 underline text-PRIMARY font-semibold"
              >
                123456789
              </td>
              <td className="px-3 py-5 whitespace-nowrap">Web</td>
              <td className="px-3 py-5 whitespace-nowrap">20 nov, 2023</td>
              <td className="px-3 py-5 whitespace-nowrap">4</td>
              <td className="px-3 py-5 whitespace-nowrap">15 whitespace-nowrap2</td>
              <td className="px-3 py-5 whitespace-nowrap">$441.60</td>
              <td className="px-3 py-5 whitespace-nowrap">$0</td>
              <td className="px-3 py-5 whitespace-nowrap">$441.60</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderHIstory;
