
import {auth} from "@/app/auth";
import Link from "next/link";

export default async function Favorites(){
    const session = await auth();
    
    if (!session?.user) {//make comp
        return <p>Sign in to view and add favorites</p>
    }

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