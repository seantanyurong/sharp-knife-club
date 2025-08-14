"use client";
import { ChangeEvent, FC } from "react";
import { orderType } from "@/types/orderType";

interface Props {
  order: orderType;
}

const Order: FC<Props> = ({
  order,
}) => {

  // Rendering the Todo component
  return (
    <div className="flex items-center gap-2 p-4 border-gray-200 border-solid border rounded-lg">
      {order.blades}
    </div>
  );
};

export default Order;

