import Image from "next/image";
import NotFound from "./not-found";
import ActorFavorite from "../../../../components/ActorFavorite";
import { auth } from "@/app/auth";
import { MyProps } from "@/types";
import GetData from "@/utils/GetData";

export default async function ActorDetails({ params }: MyProps) {
  const session = await auth();

  const id = parseInt(params.id, 10);
  const url = `https://api.tvmaze.com/people/${id}?embed=castcredits`
  const actorData = await GetData(url); 

  if (!actorData) {
    return NotFound();
  }

  const actorFav = {
    tvmaze_id: actorData.id,
    user_mail: session?.user?.email,
    name: actorData.name,
    image: actorData.image?.medium,
  };
  

  return (
    <div>
      <div>
        <Image
          src={actorData.image.original}
          width={500}
          height={300}
          alt="image"
        ></Image>
      </div>
      <div>
        <p>Name: {actorData.name}</p>
        <p>County: {actorData.country?.name || "n/a"}</p>
        <p>Birthday: {actorData.birthday}</p>
      </div>
      <div>
        <p>Appears in:</p>
        <div>
          nek ovde idu baren imena serija i imena lika kojeg su glumili, dodat
          link na str sa page info?
        </div>
      </div>
      <ActorFavorite actor={actorFav} initialSaved={false} />
    </div>
  );
}
