"use client";


//Ovo je gumb koji provjerava i dodaje prikazanog glumca u favorite ukoliko nije već dodan

import { useState, useTransition, useEffect } from "react";
import { useSessionContext } from "@/context/SessionContext";
import { ActorDb } from "@/types";


export default function ActorFavorite({actor,initialSaved=false}:{actor: ActorDb, initialSaved:boolean}) {
  const [saved, setSaved] = useState(initialSaved);
  const [isPending, startTransition] = useTransition();
  const [provjera, setProvjera] = useState(true);
  const session = useSessionContext();
  const user_email = session?.user?.email;
  const id = actor.tvmaze_id


    //pri učitavanju stranice provjerava se jeli spremljen već glumac u favorite i ako je blokira ponovno spremanje (logika uzeta s predavanja)
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

  async function addFavorite() { //dodaje se u favorite i koristi se transition kako bi se blokirala komponenta dok promjena stanja nije do kraja izvršena
    startTransition(async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/actors`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({tvmaze_id: actor.tvmaze_id, user_mail: user_email, name:actor.name, image: actor.image}),
      });
      
      console.log("add actor favorite: " ,res.json());
      setSaved(true);
    });
  }

  if (provjera) //prikaz dok nije utvrdeno jeli glumac već u favoritima
    return (
      <button className="px-3 py-1 rounded bg-gray-300 text-gray-600" disabled>
        Provjera...
      </button>
  );

  if (!session?.user) { //korisinik koji nije registiran može pregledati glumce ali nema opciju spremanje u favorite
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
