import Image from "next/image";
import NotFound from "./not-found";
import ActorFavorite from "../../../../components/ActorFavorite";
import GetData from "@/utils/GetData";
import BackButton from "../../../../components/BackButton";
import { auth } from "@/app/auth";

//stranica za detaljan prikaz glumaca

export default async function ActorDetails({
  params,
}: {
  params: Promise<{id:string}>
}) {
  const {id} = await params;
  const session = await auth();
  
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
    <div className="flex flex-col justify-center items-center mt-10 gap-5">
      <div>
        <p className="text-center text-6xl font-bold">{actorData.name}</p>
      </div>
      <div>
        <Image
          src={actorData.image.original}
          width={500}
          height={300}
          alt="image"
        ></Image>
      </div>
      <div className="mt-10 text-2xl">
        <p>County: {actorData.country?.name || "n/a"}</p>
        <p>Birthday: {actorData.birthday}</p>
      </div>

      <div className="mt-5 mb-10">
        <ActorFavorite actor={actorFav} initialSaved={false} />
      </div>
      <div>
        <BackButton></BackButton>
      </div>  
    </div>
  );
}
