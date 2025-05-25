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
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/api/actors?user_mail=${session?.user?.email}`;

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
    } else setFavorites(favoritesRes);
  }

    //dohvacaju se glumci iz baze i prikazuju

  return (
    <div className="w-full min-h-screen bg-gradient-to-t from-blue-900 to-black">
      <h1 className="text-white text-6xl">Your Favorite Actors</h1>
      <div className="grid grid-cols-4 gap-5 mt-10">
        {favorites.map((f: ActorDb) => [
          <div
            key={f.tvmaze_id}
            className="flex flex-col justify-around bg-gray-900 w-fit h-fit pb-3 pl-3"
          >
            <div className="w-fit h-fit p-10 flex flex-col items-center">
              <div>
                {f.image ? (
                  <div className="transition delay-75 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
                    <Image
                      src={f.image}
                      width={300}
                      height={300}
                      alt="image"
                    ></Image>
                  </div>
                ) : (
                  <div className="w-[50px] h-[50px] bg-black text-white">
                    No Image
                  </div>
                )}
              </div>
              <div className="mt-5 text-center">
                <p className="text-2xl font-bold text-white">{f.name}</p>
              </div>
            </div>

            <DeleteActor id={f.tvmaze_id} OnDelete={GetFavorites}></DeleteActor>
          </div>,
        ])}
      </div>
    </div>
  );
}
