import React from "react";
import OrderItem from "../../components/Order/OrderItem";
import {
  useFetchAllProductsQuery,
  useFetchOrdersBySessionQuery,
} from "../../features";
import { getTimeFromISODateString } from "../../services/helper";

const Order = () => {
  const { data, isLoading, isError } = useFetchOrdersBySessionQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>An error has occured!</div>;
  }

  console.log(data.items);

  return (
    <div className="w-full h-full px-8 md:px-20">
      <div className="w-full h-full flex flex-col items-center py-8">
        <div className="text-3xl font-semibold">Orders</div>

        <div className="w-full">
          <div className="w-full">
            <table className="w-full border-spacing-y-8 border-separate">
              <thead>
                <tr className="border-b border-slate-400 border-opacity-70">
                  <th
                    colSpan={2}
                    className="text-start pb-4 text-xs font-normal opacity-85 border-b border-slate-600"
                  >
                    PRODUCT
                  </th>
                  <th className="text-start hidden md:block pb-4 text-xs font-normal opacity-85 border-b border-slate-600">
                    QUANTITY
                  </th>
                  <th className="pb-4 text-xs font-normal opacity-85 border-b border-slate-600">
                    TOTAL
                  </th>
                </tr>
              </thead>
              <tbody>
                {data
                  ? data.items.map((item, index) => {
                      return (
                        <OrderItem
                          key={index}
                          picture={item.product.pictures[0]}
                          status={item.status}
                          quantity={item.quantity}
                          name={item.product.name}
                          properties={item.variant.properties}
                          price={item.variant.price}
                          orderDate={getTimeFromISODateString(item.createdAt)}
                        />
                      );
                    })
                  : "Error"}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
