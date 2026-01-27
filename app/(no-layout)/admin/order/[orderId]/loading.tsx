export default function Loading() {
  return (
    <div className="p-4 flex justify-center flex-col">
      <div className="underline cursor-pointer mb-2 opacity-50">Back to Dashboard</div>

      <div className="rounded-xl border p-4">
        <div className="h-6 w-40 bg-gray-200 rounded mb-2 animate-pulse" />
        <div className="h-4 w-80 bg-gray-200 rounded animate-pulse" />
      </div>

      <div className="mt-4 space-y-2">
        <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-11/12 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-10/12 bg-gray-200 rounded animate-pulse" />
      </div>
    </div>
  );
}
