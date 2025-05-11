import Link from "next/link";
import EpisodeDisplay from "../../../../../components/EpisodeDisplay";

type Props ={
    params: {id:string};
};

export default async function ShowEpisodes({params}: Props) {
    const id = params.id;
    console.log(id,"hello from episode page");
    

    const episodesRes = await fetch(`https://api.tvmaze.com/shows/${id}/episodes`);

    if (!episodesRes.ok) {
        throw new Error("Episode list not found");
    }

    const episodeData = await episodesRes.json();
    console.log(episodeData);
    return(
        <div>
            <div>
                <p>Ode ce ic slika</p>
                <h1>Naziv serije</h1>
            </div>
            <div>
                <h2>Episodes:</h2>
                <div>
                    {episodeData.map((episode: any) => (
                        <Link href={`../../episodes/${episode.id}`}>
                            <EpisodeDisplay key={episode.id} episode={episode}></EpisodeDisplay>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}