"use client"

import { useEffect, useState } from "react";
import DeleteButton from "../../../../components/DeleteButton";
import ShowDisplay from "../../../../components/ShowDisplay";

type Props ={
    params: {id:string};
};

export default function ActorFavorites({ params }: Props) {
  const [favorites, setFavorites] = useState([]);

  useEffect(()=>{
    try {
      GetFavorites();
    } catch (error) {
      console.log(error);
    }
  }, [])

  async function GetFavorites() {
    //
  }


  return (
    <div>
    </div>
  );
}