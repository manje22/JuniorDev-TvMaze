import Image from "next/image";

export default async function EpisodeDisplay({ episode }) {
    const data = await episode;
    return(
        <div>
            <div>
                <Image src={data.image.medium} width={50} height={50} alt="image"></Image>
            </div>
            <div>
                <p>Naziv epizode: {data.name}</p>
                <p>Release Date: {data.airdate}</p>
            </div>
        </div>
    )
}