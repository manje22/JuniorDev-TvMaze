"use client"

import { useEffect, useState } from "react";
import DeleteButton from "../../../../components/DeleteButton";
import ShowDisplay from "../../../../components/ShowDisplay";
import { useSessionContext } from "@/context/SessionContext";


type Show ={
  tvmaze_id : string;
  name: string;
  image: string;
}

export default function ShowFavorites({ params }: Props) {
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
    const res = await fetch(`http://localhost:3000/api/favorites?user_mail=${session?.user?.email}`);

    const favoritesRes = await res.json();
    setFavorites(favoritesRes);
    console.log("favorite shows", favoritesRes);
  }


  return (
    <div>
      {favorites.map((f:Show) => [
        <div key={f.tvmaze_id}>
          <ShowDisplay image={f.image} name={f.name}></ShowDisplay>
          <DeleteButton id={f.tvmaze_id} OnDelete={GetFavorites}></DeleteButton>
        </div>,
      ])}
    </div>
  );
}