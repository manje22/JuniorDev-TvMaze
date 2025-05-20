import Link from "next/link";

export default function Favorites(){
    return(
        <div>
            <div>
                <Link href={"/favorites/favoriteShows"}>View favorite shows</Link>
            </div>
            <div>
                <Link href={"/favorites/favoriteActors"}>View favorite actors</Link>
            </div>
        </div>
    )
}