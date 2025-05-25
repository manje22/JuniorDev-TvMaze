"use client";

import { useState, useTransition, useEffect } from "react";
import { useSessionContext } from "@/context/SessionContext";
import { ActorDb } from "@/types";
//ovo exporttat u types

export default function ActorFavorite({actor,initialSaved=false}:{actor: ActorDb, initialSaved:boolean}) {
  const [saved, setSaved] = useState(initialSaved);
  const [isPending, startTransition] = useTransition();
  const [provjera, setProvjera] = useState(true);
  const session = useSessionContext();
  const user_email = session?.user?.email;
  const id = actor.tvmaze_id

    useEffect(() => {
      if (!session?.user) {
        setProvjera(false);
        return;
      }
      fetch(`/api/actors/${id}?user_mail=${user_email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Actor not in favorites") {
          setSaved(false)
        }
        else
          setSaved(true);
      })
      .catch((err) => console.log("Fetch error:", err))
      .finally(() => setProvjera(false));
  }, [actor]);

  async function addFavorite() {
    startTransition(async () => {
      const res = await fetch(`http://localhost:3000/api/actors`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({tvmaze_id: actor.tvmaze_id, user_mail: user_email, name:actor.name, image: actor.image}),
      });
      
      const data = await res.json();
      setSaved(true);
    });
  }

  if (provjera)
    return (
      <button className="px-3 py-1 rounded bg-gray-300 text-gray-600" disabled>
        Provjera...
      </button>
  );

  if (!session?.user) {
    return <div></div>;
  }


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
