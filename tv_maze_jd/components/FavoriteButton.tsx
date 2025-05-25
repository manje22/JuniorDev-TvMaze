"use client";

import { useState, useTransition, useEffect } from "react";
import { useSessionContext } from "@/context/SessionContext";

type ShowDbEntity = {
  tvmaze_id: number,
  name: string,
  image:string,
}

export default function FavoriteButton({show,initialSaved=false}:{show: ShowDbEntity, initialSaved:boolean}) {
  const [saved, setSaved] = useState(initialSaved);
  const [isPending, startTransition] = useTransition();
  const [provjera, setProvjera] = useState(true);
  const session = useSessionContext();
  const user_email = session?.user?.email;
  const id = show.tvmaze_id

    useEffect(() => {
      if (!session?.user) {
        setProvjera(false);
        return;
      }
      console.log("Show from favbtn: ",show);
      fetch(`/api/favorites/${id}?user_mail=${user_email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Show saved?: ", data);
        if (data.message === "Show not in favorites") {
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}api/favorites`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({tvmaze_id: show.tvmaze_id, user_mail: user_email, name:show.name, image: show.image}),
      });
      
      const data = await res.json();
      console.log("Add favorite message: ", data.message);
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
