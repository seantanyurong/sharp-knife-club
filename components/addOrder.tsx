"use client";
import { ChangeEvent, FC, useState } from "react";

interface Props {
  createOrder: (blades: number) => void;
}

const AddOrder: FC<Props> = ({ createOrder }) => {
  // State for handling input value
  const [input, setInput] = useState(0);

  // Event handler for input change
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setInput(isNaN(value) || value < 1 ? 1 : value);
  };

  // Event handler for adding a new todo
  const handleAdd = async () => {
    createOrder(input);
    setInput(0);
  };

  return (
    <div className="w-full flex gap-1 mt-2">
      <input
        type="number"
        className="w-full px-2 py-1 border border-gray-200 rounded outline-none"
        onChange={handleInput}
        value={input}
      />
      <button
        className="flex items-center justify-center bg-green-600 text-green-50 rounded px-2 h-9 w-14 py-1"
        onClick={handleAdd}
      >
        Add
      </button>
    </div>
  );
};

export default AddOrder;
