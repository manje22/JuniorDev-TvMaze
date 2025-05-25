"use client";


//Ovo je gumb koji provjerava i dodaje prikazanu seriju u favorite ukoliko nije već dodana


import { useState, useTransition, useEffect } from "react";
import { useSessionContext } from "@/context/SessionContext";
import { ShowDb } from "@/types";


export default function AddFavoriteButton({show,initialSaved=false}:{show: ShowDb, initialSaved:boolean}) {
  const [saved, setSaved] = useState(initialSaved);
  const [isPending, startTransition] = useTransition();
  const [provjera, setProvjera] = useState(true);
  const session = useSessionContext();
  const user_email = session?.user?.email;
  const id = show.tvmaze_id; //primini id kroz props
  //const url = props

    useEffect(() => {
      if (!session?.user) {
        setProvjera(false);
        return;
      }
      console.log("Show from favbtn: ",show); //ovo naravno prilagodi
      fetch(`/api/favorites/${id}?user_mail=${user_email}`) //slat cemo prikladni url
      .then((res) => res.json())
      .then((data) => {
        console.log("Show saved?: ", data); //opet prilagodi
        if (data.message === "Show not in favorites") { //prilagodi
          setSaved(false)
        }
        else
          setSaved(true);
      })
      .catch((err) => console.log("Fetch error:", err))
      .finally(() => setProvjera(false));
  }, [show]); //ne show nego objekt koji dobivamo

  async function addFavorite() {
    startTransition(async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/favorites`, { //opet možemo poslat url
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({tvmaze_id: show.tvmaze_id, user_mail: user_email, name:show.name, image: show.image}), //prilagodit cemo
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
