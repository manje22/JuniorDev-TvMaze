"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  function handleClick() {
    router.back();
  }

  return (
    <button
      onClick={handleClick}
      className="bg-blue-400 hover:bg-blue-600 text-white px-3 py-1 rounded-2xl fixed bottom-5 left-15"
    >
      Go back
    </button>
  );
}
