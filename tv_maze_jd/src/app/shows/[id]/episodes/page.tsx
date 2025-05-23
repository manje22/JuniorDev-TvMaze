import Link from "next/link";
import EpisodeDisplay from "../../../../../components/EpisodeDisplay";
import { MyProps } from "@/types";
import GetData from "@/utils/GetData";


export default async function ShowEpisodes({params}: MyProps) {
    
    const id = params.id;
    const url = `https://api.tvmaze.com/shows/${id}/episodes`;

    const episodeData = await GetData(url);
    if (!episodeData) throw new Error("Episode list not found");
    
    
    return (
      <div>
        <div>
          <h2>Episodes:</h2>
          <div>
            {episodeData.map((episode: any) => (
              <div key={episode.id}>
                <Link href={`../../episodes/${episode.id}`}>
                  <EpisodeDisplay episode={episode}></EpisodeDisplay>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
}