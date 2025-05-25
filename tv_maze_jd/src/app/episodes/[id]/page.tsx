
import { notFound } from "next/navigation";
import Image from "next/image";

export default async function EpisodeDetails({
  params,
}: {
  params: Promise<{id:string}>
}) {
  const {id} = await params;

  const response = await fetch(`https://api.tvmaze.com/episodes/${id}`);

  if (!response.ok) {
    return notFound();
  }

  const res = await response.json();

  return (
    <div className="flex flex-col gap-5 ml-10">
      <h1 className="text-4xl font-bold p-5">
        Season {res.season} ep. {res.number}
      </h1>
      <div>
        <Image src={res.image.original} width={500} height={300} alt="image" />
      </div>
      <div>
        <h2 className="text-4xl">Details:</h2>
      </div>
      <div className="text-2xl flex flex-col gap-2">
        <p>
          <strong>Name: </strong>
          {res.name}
        </p>
        <p>
          <strong>Summary: </strong>
          <span dangerouslySetInnerHTML={{ __html: res.summary }} />
        </p>
        <p>
          <strong>Rating: </strong>
          {res.rating?.average ?? "N/A"}
        </p>
        <p>
          <strong>Airdate: </strong>
          {res.airdate}
        </p>
      </div>
    </div>
  );
}
