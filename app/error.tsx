"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="max-w-[1080px] mx-auto text-center my-[4rem]">
      <h2 className="text-[2rem] max-[350px]:text-[1.7rem] ">
        Something went wrong!
      </h2>
      <button
        className="bg-slate-700 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded mt-8"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
