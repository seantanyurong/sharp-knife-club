"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Order() {
  const [numberOfKnives, setNumberOfKnives] = useState("3");

  const numberOfKnivesOptions = ["3", "4", "5", "6", "7"];

  return (
    <main>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl mt-6 mb-6 font-bold text-center">
          Knife Sharpening SG
        </h1>
        <div>
          {numberOfKnivesOptions.map((option) => (
            <Button
              key={option}
              onClick={() => setNumberOfKnives(option)}
              className={`${option === numberOfKnives ? "bg-primary" : "bg-muted"} text-white text-sm font-medium py-2 px-4 rounded-lg shadow-md hover:bg-yellow-600 transition`}
            >
              {option}
            </Button>
          ))}
        </div>
      </div>
    </main>
  );
}
