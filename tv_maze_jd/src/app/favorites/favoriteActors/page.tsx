"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useSessionContext } from "@/context/SessionContext"; 
import DeleteActor from "../../../../components/DeleteActor";
import { ActorDb } from "@/types";
import GetData from "@/utils/GetData";


export default function ActorFavorites() {
  const [favorites, setFavorites] = useState([]);
  const session = useSessionContext();
  const url = `http://localhost:3000/api/actors?user_mail=${session?.user?.email}`;

  useEffect(() => {
    try {
      GetFavorites();
    } catch (error) {
      console.log(error);
    }
  }, []);

  async function GetFavorites() {
    const favoritesRes = await GetData(url);
    if (!favoritesRes) {
      throw new Error("Problem getting favorite actors");
    }else
      setFavorites(favoritesRes);
  }

  return (
    <div>
      {favorites.map((f: ActorDb) => [
        <div key={f.tvmaze_id}>
          <div>
            {f.image ? (
              <Image src={f.image} width={50} height={50} alt="image"></Image>
            ) : (
              <div className="w-[50px] h-[50px] bg-black text-white">
                No Image
              </div>
            )}
          </div>
          <div>{f.name}</div>
          <DeleteActor id={f.tvmaze_id} OnDelete={GetFavorites}></DeleteActor>
        </div>,
      ])}
    </div>
  );
}
