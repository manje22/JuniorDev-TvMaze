"use client";

import { useSessionContext } from "@/context/SessionContext";
import Link from "next/link";

export default function Favorites(){
    const session = useSessionContext();
    
    if (!session?.user) {
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