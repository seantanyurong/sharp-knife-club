import * as React from "react";

type Props = {
  name: string,
  role: string,
}

export default function ProfileCard({
  name,
  role,
}: Props) {

  return (
    <div className="w-full rounded-lg border p-6 shadow-lg">
      <h1 className="mb-6 text-center text-2xl font-bold">{name}</h1>
      <p className="text-center text-gray-500">
        Role: {role}
      </p>
    </div>
  )
}
