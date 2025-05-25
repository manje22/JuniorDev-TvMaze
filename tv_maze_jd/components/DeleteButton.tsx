"use client";


import { useSessionContext } from "@/context/SessionContext";

//za brisanje serija iz favorita

export default function DeleteButton({id, OnDelete}:{id:number; OnDelete:()=> void;}) {
  const session = useSessionContext();



  async function removeFavorite() {
    const res = await fetch("/api/favorites", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tvmaze_id: id,
        user_mail: session?.user?.email,
      }),
    });

    const data = await res.json();
    console.log(data);
    OnDelete();
  }

  return (
    <button
      onClick={removeFavorite}
      className="bg-red-600 text-white p-3 rounded-4xl text-center w-fit hover:bg-red-700"
    >
        Del
    </button>
  );
}
