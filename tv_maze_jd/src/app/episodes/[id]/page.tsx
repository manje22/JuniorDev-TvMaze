import Image from "next/image";
import NotFound from "./not-found";
import { MyProps } from "@/types";

export async function generateMetadata({ params }: MyProps) {
  const  id  = parseInt(params.id, 10);
  const res = await fetch(`https://api.tvmaze.com/episodes/${id}`);
  if (!res.ok) return { title: "Episode not found" };
 
  const data = await res.json();
 
  const image = data.image.medium;
 
  return {
    title: `Tv encyclopedia episode │ ${data.name}`,
    description: `${data.name} details`,
    openGraph: {
      images: [{ url: image, width: 400, height: 400 }],
    }
  };
}

export default async function EpisodeDetails({params}: MyProps) {
    const epId = params.id;

    const EpisodeDetails = await fetch(`https://api.tvmaze.com/episodes/${epId}`);

    if (!EpisodeDetails.ok) {
        return NotFound();
    }
    
    const episodeData = await EpisodeDetails.json();

    return(
        <div>
            <div>
                <Image src={episodeData.image.original} width={500} height={300} alt="image"></Image>
            </div>
            <div>
                <p>Name: {episodeData.name}</p>
                <p>Season {episodeData.season} ep. {episodeData.number}</p>
                <p>Summary: {episodeData.summary}</p>
                <p>Rating: {episodeData.rating.average}</p>
                <p>Airdate: {episodeData.airdate}</p>
            </div>
        </div>
    )
}