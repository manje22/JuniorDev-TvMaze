"use client";

import { useState, useTransition, useEffect } from "react";
import { useSessionContext } from "@/context/SessionContext";



export default function DeleteActor({id, OnDelete}:{id:number; OnDelete:()=> void;}) {
  const [isPending, startTransition] = useTransition();
  const session = useSessionContext();



  async function removeFavorite() {
    const res = await fetch("/api/actors", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tvmaze_id: id,
        user_mail: session?.user?.email,
      }),
    });

    const data = await res.json();
    console.log("Deleted data: ",data);
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
