import Image from "next/image";
import NotFound from "./not-found";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);
  const res = await fetch(`https://api.tvmaze.com/episodes/${id}`);
  if (!res.ok) return { title: "Episode not found" };

  const data = await res.json();
  const image = data.image?.medium ?? "";

  return {
    title: `Tv encyclopedia episode │ ${data.name}`,
    description: `${data.name} details`,
    openGraph: {
      images: [{ url: image, width: 400, height: 400 }],
    },
  };
}

export default async function EpisodeDetails({ params }: { params: { id: string } }) {
  const epId = params.id;
  const EpisodeDetails = await fetch(`https://api.tvmaze.com/episodes/${epId}`);

  if (!EpisodeDetails.ok) {
    return NotFound();
  }

  const episodeData = await EpisodeDetails.json();

  return (
    <div className="flex flex-col gap-5 ml-10">
      <h1 className="text-4xl font-bold p-5">
        Season {episodeData.season} ep. {episodeData.number}
      </h1>
      <div>
        <Image src={episodeData.image.original} width={500} height={300} alt="image" />
      </div>
      <div>
        <h2 className="text-4xl">Details:</h2>
      </div>
      <div className="text-2xl flex flex-col gap-2">
        <p>
          <strong>Name: </strong>
          {episodeData.name}
        </p>
        <p>
          <strong>Summary: </strong>
          <span dangerouslySetInnerHTML={{ __html: episodeData.summary }} />
        </p>
        <p>
          <strong>Rating: </strong>
          {episodeData.rating.average}
        </p>
        <p>
          <strong>Airdate: </strong>
          {episodeData.airdate}
        </p>
      </div>
    </div>
  );
}
