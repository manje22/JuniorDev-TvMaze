import Link from "next/link";
import EpisodeDisplay from "../../../../../components/EpisodeDisplay";
import { MyProps } from "@/types";
import GetData from "@/utils/GetData";
import ScrollToTopButton from "../../../../../components/ScrollToTopButton";



interface Episode {
  id: string;
  name: string;
  airdate: string;
  image: {
    medium: string;
    original: string;
  };
}


export default async function ShowEpisodes({params}: MyProps) {
    
    const id = params.id;
    const url = `https://api.tvmaze.com/shows/${id}/episodes`;

    const episodeData = await GetData(url);
    if (!episodeData) throw new Error("Episode list not found");
    
    
    return (
      <div>
        <div>
          <h2 className="text-7xl text-center mb-5 mt-10">Episodes:</h2>
          <div className="grid grid-cols-3">
            {episodeData.map((episode: Episode) => (
              <div key={episode.id} className="w-fit h-fit mb-10 m-auto shadow-2xl transition ease-in-out duration-100 hover:scale-110">
                <Link href={`../../episodes/${episode.id}`}>
                  <EpisodeDisplay episode={episode}></EpisodeDisplay>
                </Link>
              </div>
            ))}
          </div>
          <ScrollToTopButton></ScrollToTopButton>
        </div>
      </div>
    );
}