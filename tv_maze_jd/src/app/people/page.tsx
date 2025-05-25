"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import ScrollToTopButton from "../../../components/ScrollToTopButton";
import { Actor } from "../../types";
import CastMemberDisplay from "../../../components/CastMemberDisplay";



export default function PeoplePage() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [ActorData, setActorData] = useState<Actor[]>([]);
  const [display, setDisplay] = useState<Actor[]>([]);
  const [displayCount, setDisplayCount] = useState(0);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const { ref, inView } = useInView();
  const viewPerPage: number = 24;

  useEffect(() => {
    //Sprijecava vise fetcha ako je npr. spor internet ili nesto drugo bloka
    if (isFetching) return;

    setIsFetching(true);

    fetch(`https://api.tvmaze.com/people?page=${currentPage}`)
      .then((r) => r.json())
      .then((data: Actor[]) => {
        setActorData((prev) => [
          ...prev,
          ...data.filter((s) => !prev.some((x) => x.id === s.id)), //filtriranje kako bi se pomoglo u sprijecavanju duplog rendiranja
        ]);
      })
      .catch(console.error)
      .finally(() => setIsFetching(false));
  }, [currentPage]);

  const loadMore = useCallback(() => {
    if (displayCount >= ActorData.length) {
      if (!isFetching) {
        setCurrentPage((p) => p + 1); //ako su prikazane sve dohvaćene serije dohvati sljedeću str
      }
      return;
    }

    //uzima se sljedeci niz serija, od zadnje prikazane plus jos 24 (view per page)
    const nextSet = ActorData.slice(displayCount, displayCount + viewPerPage);

    //postavljanje sljedece serije u prikaz (display)
    setDisplay((prev) => {
      const seen = new Set(prev.map((s) => s.id)); //upotrebljen Set jer sadrži samo jedinstvene vrijednosti (pokušaj spriječavanja duplog dodavanja)
      return [...prev, ...nextSet.filter((s) => !seen.has(s.id))];
    });

    //display count pomicemo na osnovi NEfiltriranih podataka
    setDisplayCount((p) => p + nextSet.length);
  }, [ActorData, displayCount, isFetching]);

  //ucitavanje jos serija ako se dode do kraja trenutnog prikaza
  useEffect(() => {
    if (inView) loadMore();
  }, [inView, loadMore]);

  return (
    <main className="flex flex-col">
      <div className="w-full h-auto bg-black flex flex-col items-center ">
        <h1 className="text-white m-10 pt-5 font-bold text-4xl ">
          The best site for all your favorite actors
        </h1>
        <Image
          src={"/tvStock.jpg"}
          width={450}
          height={450}
          className=""
          alt="picture of tv"
          priority
        ></Image>
      </div>
      <div className="m-auto grid grid-cols-5 gap-20 mt-20">
        {display.map((a: Actor) => (
          <Link href={`/people/${a.id}`} key={a.id} className="shadow-2xl">
            <CastMemberDisplay person={a} />
          </Link>
        ))}
      </div>

      <ScrollToTopButton />

      <div ref={ref} className="py-10 text-center">
        Loading more…
      </div>
    </main>
  );
}
