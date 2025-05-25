"use client"

import { useEffect, useState } from "react";
import DeleteButton from "../../../../components/DeleteButton";
import ShowDisplay from "../../../../components/ShowDisplay";
import { useSessionContext } from "@/context/SessionContext";
import { ShowDb } from "@/types";
import GetData from "@/utils/GetData";



export default function ShowFavorites() {
  const [favorites, setFavorites] = useState<ShowDb[]>([]);
  const session = useSessionContext();
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/api/favorites?user_mail=${session?.user?.email}`;
  
  useEffect(()=>{
    try {
      GetFavorites();
    } catch (error) {
      console.log(error);
    }
  }, [])

  async function GetFavorites() {
    const favoritesRes = await GetData(url);
    if(!favoritesRes)
      throw new Error("Problem getting favorites");
    else
      setFavorites(favoritesRes);
  }


  return (
    <div className="w-full min-h-screen bg-gradient-to-t from-blue-900 to-black">
      <h1 className="text-white text-6xl">Your Favorite Shows</h1>
      <div className="grid grid-cols-4 gap-5 mt-10">
        {favorites.map((f: ShowDb) => [
          <div key={f.tvmaze_id} className="flex flex-col justify-around bg-white w-fit h-fit pb-3 pl-3">
            <ShowDisplay image={f.image} name={f.name}></ShowDisplay>
            <DeleteButton
              id={f.tvmaze_id}
              OnDelete={GetFavorites}
            ></DeleteButton>
          </div>,
        ])}
      </div>
    </div>
  );
}