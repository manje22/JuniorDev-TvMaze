"use client";

import { getShowbyId } from "@/app/db/statements";
import { useState, useTransition, useEffect } from "react";

export default function DeleteButton({id, OnDelete}:{id:string; OnDelete:()=> void;}) {
  const [isPending, startTransition] = useTransition();



  async function removeFavorite() {
    const res = await fetch("/api/favorites", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tvmaze_id: id,
      }),
    });

    const data = await res.json();
    console.log(data);
    OnDelete();
  }

  return (
    <button
      onClick={removeFavorite}
      className="bg-red-600 text-white hover:bg-red-100"
    >
        Remove from favorites
    </button>
  );
}
