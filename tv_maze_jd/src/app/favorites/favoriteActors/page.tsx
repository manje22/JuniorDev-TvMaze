"use client";

import { useEffect, useState } from "react";
import { useSessionContext } from "@/context/SessionContext"; 
import DeleteActor from "../../../../components/DeleteActor";
import { Actor } from "@/types";
import CastMemberDisplay from "../../../../components/CastMemberDisplay";


export default function ActorFavorites() {
  const [favorites, setFavorites] = useState([]);
  const session = useSessionContext();

  useEffect(() => {
    try {
      GetFavorites();
    } catch (error) {
      console.log(error);
    }
  }, []);

  async function GetFavorites() {
    const res = await fetch(
      `http://localhost:3000/api/actors?user_mail=${session?.user?.email}`
    );

    const favoritesRes = await res.json();
    setFavorites(favoritesRes);
    console.log("favorite Actors", favoritesRes);
  }

  return (
    <div>
      {favorites.map((f: Actor) => [
        <div key={f.id}>
          <CastMemberDisplay person={f}></CastMemberDisplay>
          <DeleteActor id={f.id} OnDelete={GetFavorites}></DeleteActor>
        </div>,
      ])}
    </div>
  );
}
