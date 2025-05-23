"use client"

import { useEffect, useState } from "react";
import { useSessionContext } from "@/context/SessionContext";
import Image from "next/image";
import DeleteActor from "../../../../components/DeleteActor";

//not really good
type Actor ={
  tvmaze_id : string;
  name: string;
  image: string;
}

export default function ActorFavorites() {
  const [favorites, setFavorites] = useState([]);
  const session = useSessionContext();

  useEffect(()=>{
    try {
      GetFavorites();
    } catch (error) {
      console.log(error);
    }
  }, [])

  async function GetFavorites() {
    const res = await fetch(`http://localhost:3000/api/actors?user_mail=${session?.user?.email}`);

    const favoritesRes = await res.json();
    setFavorites(favoritesRes);
    console.log("favorite Actors", favoritesRes);
  }


  return (
    <div>
      {favorites.map((f:Actor) => [
        <div key={f.tvmaze_id}>
          <div>
            <Image src={f.image} height={100} width={100} alt="picture"></Image>
            <p>{f.name}</p>
          </div>
          <DeleteActor id={f.tvmaze_id} OnDelete={GetFavorites}></DeleteActor>
        </div>,
      ])}
    </div>
  );
}