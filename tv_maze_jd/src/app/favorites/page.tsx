
import {auth} from "@/app/auth";
import Link from "next/link";
import Image from "next/image";

export default async function Favorites(){
    const session = await auth();
    
    if (!session?.user) {
        return (
          <div className="flex flex-col w-full">
            <div className=" flex flex-col items-center m-auto mt-100">
              <h1 className="text-6xl">You need to be signed in to view favorites</h1>
              <Image src={"/sadLogIn.png"} width={500} height={500} alt="sad image"></Image>
            </div>
          </div>
        );
    }

    return (
      <div className="flex flex-col justify-center items-center gap-10 min-h-screen bg-gradient-to-t from-blue-50 to-white py-10">
        <h1 className="text-7xl font-bold text-gray-800">Your favorites</h1>

        <div className="flex flex-wrap justify-center gap-10">
          <div className="mt-5 border border-gray-200 rounded-2xl p-4 w-[300px] h-[420px] bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 hover:scale-105 transform">
            <Link href={"/favorites/favoriteShows"} className="h-full w-full flex flex-col items-center">
              <Image
                src={"/tvSketch.png"}
                width={200}
                height={160}
                alt="tv"
              ></Image>
              <p className="text-xl text-center text-gray-700 mt-auto">Shows</p>
            </Link>
          </div>
          <div className="mt-5 border border-gray-200 rounded-2xl p-4 w-[300px] h-[420px] bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 hover:scale-105 transform">
            <Link href={"/favorites/favoriteActors"} className="h-full w-full flex flex-col items-center">
              <Image
                src={"/Actorsketch.jpg"}
                width={200}
                height={160}
                alt="actor"
              ></Image>
              <p className="text-xl text-center text-gray-700 mt-auto">
                Actors
              </p>
            </Link>
          </div>
        </div>
      </div>
    );
}