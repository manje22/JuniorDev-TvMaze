"use client";

import { getShowbyId } from "@/app/db/statements";
import { useState, useTransition, useEffect } from "react";


export default function FavoriteButton({show,initialSaved=false}) {
  const [saved, setSaved] = useState(initialSaved);
  const [isPending, startTransition] = useTransition();
  const [provjera, setProvjera] = useState(true); 
  const id = show.tvmaze_id

    useEffect(() => {
      fetch(`http://localhost:3000/api/favorites/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Show saved?: ", data);
        if (data.status === 404) {
          setSaved(false)
        }
        else
          setSaved(true);
      })
      .catch((err) => console.log("Fetch error:", err))
      .finally(() => setProvjera(false));
  }, [show]);

  async function addFavorite() {
    startTransition(async () => {
      const res = await fetch("http://localhost:3000/api/favorites", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({tvmaze_id: show.tvmaze_id, name:show.name, image: show.image}),
      });
      
      const data = await res.json();
      console.log(data.message);
      setSaved(true);
    });
  }

  if (provjera)
    return (
      <button className="px-3 py-1 rounded bg-gray-300 text-gray-600" disabled>
        Provjera...
      </button>
    );


  return (
    <button
      disabled={saved || isPending}
      onClick={addFavorite}
      className={`px-3 py-1 rounded text-white ${
        saved ? "bg-green-600" : "bg-amber-500 hover:bg-amber-600"
      }`}
    >
      {saved
        ? "Added to favorites"
        : isPending
        ? "Saving..."
        : "Add to favorites"}
    </button>
  );
}
