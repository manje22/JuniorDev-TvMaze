import {auth} from "@/app/auth";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import BackButton from "../../../../components/BackButton";
import FavoriteButton from "../../../../components/FavoriteButton";
import globe from "../../../../public/globe.svg";
import { Castmember} from "@/types";


export async function ShowPage({
  params,
}: {
  params: Promise<{id:string}>
}) {
  const {id} = await params;

  const session = await auth();

  const showRes = await fetch(`https://api.tvmaze.com/shows/${id}?embed=cast`);

  if (!showRes.ok) {
    return notFound();
  }

  const showData = await showRes.json();
  const showFav = {
    tvmaze_id: showData.id,
    user_mail: session?.user?.email,
    name: showData.name,
    image: showData.image?.medium,
  };

  const poster = showData.image?.original;
  const cast = showData._embedded.cast;

  return (
    <div className="flex flex-col items-center gap-10">
      <h1 className="text-center text-6xl mt-10">{showData.name}</h1>
      <div>
        <Image
          src={poster}
          alt={`${showData.name} poster`}
          width={500}
          height={500}
          priority={true}
        ></Image>
      </div>
      <div className="self-start">
        <ul className="flex flex-col gap-5">
          <li>Summary: {showData.summary}</li>
          <li className="text-2xl">Premiered: {showData.premiered}</li>
          <li className="text-2xl">Ended: {showData.ended}</li>
          <li className="text-2xl">
            <p className="inline">Genres: </p>
            {showData.genres.map((g: string) => (
              <p key={g} className="inline">
                {g + " "}
              </p>
            ))}
          </li>
        </ul>
      </div>
      <div className="flex gap-5 self-start">
        <p className="text-2xl">Cast:</p>
        <div className="flex justify-center gap-10 items-stretch">
          {cast.slice(0, 3).map((c: Castmember) => (
            <div key={c.person.id + c.character.id} className="h-full w-full flex flex-col items-center shadow-md ">
              {c.person.image ? (
                <Image
                  src={c.person.image?.original}
                  alt={c.person.name}
                  width={100}
                  height={100}
                  
                ></Image>
              ) : (
                <Image
                  src={globe}
                  alt="no picture"
                  height={100}
                  width={100}
                ></Image>
              )}

              <p className="text-xl text-center text-gray-700 mt-auto">{c.person.name}</p>
              <p className="text-center">As: {c.character.name}</p>
            </div>
          ))}
          <div className="shadow-md text-center w-fit h-fit p-5 self-stretch text-2xl font-bold bg-blue-50">
            <Link href={`/shows/${id}/cast`}>
                View More
              </Link>
          </div>
        </div>
      </div>
      <div className="flex gap-5">
        <FavoriteButton show={showFav} initialSaved={false}></FavoriteButton>
        <BackButton />
      </div>
      
    </div>
  );
}
