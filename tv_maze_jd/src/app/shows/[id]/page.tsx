import { error } from "console";
import {auth} from "@/app/auth";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import BackButton from "../../../../components/BackButton";
import FavoriteButton from "../../../../components/FavoriteButton";
import globe from "../../../../public/globe.svg";
import { Castmember, Show } from "@/app/types";

type ShowDetailsParams = {
  params: {id: string};
};

export default async function ShowDetails({ params }: ShowDetailsParams) {
  const id  = parseInt(params.id, 10);
  console.log("Id je: ", id);
  const session = await auth();
  console.log("session from showDisplay: ",session);

  const showRes = await fetch(`https://api.tvmaze.com/shows/${id}?embed=cast`);

  if (!showRes.ok) {
    return notFound();
  }

  const showData = await showRes.json();
  const showFav = {
    tvmaze_id: showData.id,
    user_mail: session?.user?.email,
    name: showData.name,
    image: showData.image?.medium
  };

  const poster = showData.image?.original;
  const cast = showData._embedded.cast;
  console.log(cast);

  return (
    <div>
      <h1 className="text-center text-4xl mt-10">{showData.name}</h1>
      <div>
        <Image
          src={poster}
          alt={`${showData.name} poster`}
          width={500}
          height={500}
          priority={true}
        ></Image>
      </div>
      <div>
        <ul>
          <li>Summary: {showData.summary}</li>
          <li>Premiered: {showData.premiered}</li>
          <li>Ended: {showData.ended}</li>
          <li>
            Genres:
            <div>
              {showData.genres.map((g:string) => (
                <p key={g}>{g}</p>
              ))}
            </div>
          </li>
        </ul>
      </div>
      <div>
        <p>Cast</p>
        {
          cast.map((c: Castmember) => (
            <div key={c.person.id+c.character.id}>
              {
                c.person.image ? (<Image src={c.person.image?.original} alt={c.person.name} width={100} height={100}></Image>) : (<Image src={globe} alt="no picture" height={100} width={100}></Image>)
              }
              
              <p>{c.person.name}</p>
              <p>plays: {c.character.name}</p>
            </div>
          ))
        }
      </div>
      <FavoriteButton show={showFav} initialSaved={false}></FavoriteButton>
      <div>
        <Link href={`/shows/${id}/episodes`}>Click here to view episodes</Link>
      </div>
      <div>
        <Link href={`/shows/${id}/cast`}>Click here to view cast members</Link>
      </div>

      <BackButton/>
    </div>
  );
}
