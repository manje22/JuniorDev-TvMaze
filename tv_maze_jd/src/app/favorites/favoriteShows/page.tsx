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
  const url = `http://localhost:3000/api/favorites?user_mail=${session?.user?.email}`;
  
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
    <div>
      {favorites.map((f:ShowDb) => [
        <div key={f.tvmaze_id}>
          <ShowDisplay image={f.image} name={f.name}></ShowDisplay>
          <DeleteButton id={f.tvmaze_id} OnDelete={GetFavorites}></DeleteButton>
        </div>,
      ])}
    </div>
  );
}