"use client";
import { FC, useState } from "react";
import { orderType } from "@/types/orderType";
import Order from "./order";
import AddOrder from "./addOrder";
import { addOrder } from "@/lib/actions/orderAction";

interface Props {
  orders: orderType[];
}

const Orders: FC<Props> = ({ orders }) => {
  // State to manage the list of todo items
  const [orderItems, setOrderItems] = useState<orderType[]>(orders);

  // Function to create a new todo item
  const createOrder = (blades: number) => {
    const id = (orderItems.at(-1)?.id || 0) + 1;
    addOrder(id, blades);
    setOrderItems((prev) => [...prev, { id: id, blades, paid: false }]);
  };

  // Rendering the Todo List component
  return (
    <main className="flex mx-auto max-w-xl w-full min-h-screen flex-col items-center p-16">
      <div className="text-5xl font-medium">To-do app</div>
      <div className="w-full flex flex-col mt-8 gap-2">
        {/* Mapping through todoItems and rendering Todo component for each */}
        {orderItems.map((order) => (
          <Order
            key={order.id}
            order={order}
          />
        ))}
      </div>
      {/* Adding Todo component for creating new todos */}
      <AddOrder createOrder={createOrder} />
    </main>
  );
};

export default Orders;
