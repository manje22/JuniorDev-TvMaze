import Image from "next/image";
import NotFound from "./not-found";
import ActorFavorite from "../../../../components/ActorFavorite";
import { useSessionContext } from "@/context/SessionContext";
import notFound from "./not-found";
import { auth } from "@/app/auth";

type Props = {
  params: { id: string };
};

export default async function ActorDetails({ params }: Props) {
  const id = parseInt(params.id, 10);
  console.log(id, "hello from actor detail page");

  const session = await auth();
  console.log("session from ActorDisplay: ", session);

  const actorRes = await fetch(`https://api.tvmaze.com/shows/${id}?embed=cast`);

  if (!actorRes.ok) {
    return notFound();
  }

  const actorDetails = await fetch(
    `https://api.tvmaze.com/people/${id}?embed=castcredits`
  );

  if (!actorDetails.ok) {
    return NotFound();
  }

  const actorData = await actorDetails.json();
  const actorFav = {
    tvmaze_id: actorData.id,
    user_mail: session?.user?.email,
    name: actorData.name,
    image: actorData.image?.medium,
  };
  console.log(actorData);

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
