import Image from "next/image";
import NotFound from "./not-found";

type Props ={
    params: {id:string};
};


export default async function EpisodeDetails({params}: Props) {
    const epId = params.id;
    console.log(epId,"hello from episode detail page");
    

    const EpisodeDetails = await fetch(`https://api.tvmaze.com/episodes/${epId}`);

    if (!EpisodeDetails.ok) {
        return NotFound();
    }

    const episodeData = await EpisodeDetails.json();
    console.log(episodeData);

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