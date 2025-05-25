import Image from "next/image";

interface Episode {
    name: string;
    airdate: string;
    image:{
        medium: string;
        original: string;
    };
}
export default async function EpisodeDisplay({ episode }: {episode: Episode}) {
    const data = await episode;
    return(
        <div>
            <div>
                <Image src={data.image.medium} width={500} height={500} alt="image"></Image>
            </div>
            <div className="flex flex-col gap-5 m-10 text-2xl font-bold">
                <p>Name: {data.name}</p>
                <p>Release Date: {data.airdate}</p>
            </div>
        </div>
    )
}