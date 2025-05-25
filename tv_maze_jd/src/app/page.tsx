"use client";

import Link from "next/link";
import ShowDisplay from "../../components/ShowDisplay";
import { useEffect, useState, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import SearchBar from "../../components/SearchBar";
import Filter from "../../components/Filter";
import ScrollToTopButton from "../../components/ScrollToTopButton";
import { Show } from "../types";
import tvstock from "../../public/tvStock.jpg";
import Image from "next/image";

export default function Home() {
  const [showFilter, setShowFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [showData, setShowData] = useState<Show[]>([]);
  const [display, setDisplay] = useState<Show[]>([]);
  const [displayCount, setDisplayCount] = useState(0);
  const [choosenFilters, setChoosenFilters] = useState<string[]>([]);
  const [appliedFilters, setAppliedFilters] = useState<string[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const { ref, inView } = useInView();
  const viewPerPage: number = 24;

  useEffect(() => {
    //Sprijecava vise fetcha ako je npr. spor internet ili nesto drugo bloka
    if (isFetching) return;
    setIsFetching(true);

    fetch(`https://api.tvmaze.com/shows?page=${currentPage}`)
      .then((r) => r.json())
      .then((data: Show[]) => {
        data.sort(
          (a, b) => (b.rating?.average || 0) - (a.rating?.average || 0)
        ); //sortiranje po popularnosti
        setShowData((prev) => [
          ...prev,
          ...data.filter((s) => !prev.some((x) => x.id === s.id)), //filtriranje kako bi se pomoglo u sprijecavanju duplog rendiranja
        ]);
      })
      .catch(console.error)
      .finally(() => setIsFetching(false));
  }, [currentPage]);

  const loadMore = useCallback(() => {
    if (displayCount >= showData.length) {
      if (!isFetching) {
        setCurrentPage((p) => p + 1); //ako su prikazane sve dohvaćene serije dohvati sljedeću str
      }
      return;
    }

    //uzima se sljedeci niz serija, od zadnje prikazane plus jos 24 (view per page)
    const nextSet = showData.slice(displayCount, displayCount + viewPerPage);

    //filtriranje prikazanih serija ukoliko su postavljeni filteri
    const nextFiltered =
      appliedFilters.length === 0
        ? nextSet
        : nextSet.filter((show) =>
            show.genres.some((g) => appliedFilters.includes(g))
          );

    //postavljanje sljedece serije u prikaz (display)
    setDisplay((prev) => {
      const seen = new Set(prev.map((s) => s.id)); //upotrebljen Set jer sadrži samo jedinstvene vrijednosti (pokušaj spriječavanja duplog dodavanja)
      return [...prev, ...nextFiltered.filter((s) => !seen.has(s.id))];
    });

    //display count pomicemo na osnovi NEfiltriranih podataka
    setDisplayCount((p) => p + nextSet.length);
  }, [showData, displayCount, appliedFilters, isFetching]);

  //ucitavanje jos serija ako se dode do kraja trenutnog prikaza
  useEffect(() => {
    if (inView) loadMore();
  }, [inView, loadMore]);

  //filtriranje serija
  function handleApply() {
    setDisplay([]);
    setDisplayCount(0);
    setAppliedFilters(choosenFilters);
  }

  function ClearFilters(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    setDisplay([]);
    setDisplayCount(0);
    setAppliedFilters([]);
    setChoosenFilters([]);
  }

  return (
    <main className="flex flex-col">
      <div className="w-full h-auto bg-black flex flex-col items-center ">
        <h1 className="text-white m-10 pt-5 font-bold text-4xl ">
          The best site for all your shows
        </h1>
        <Image
          src={tvstock}
          width={450}
          height={450}
          className=""
          alt="picture of tv"
          priority
        ></Image>
      </div>
      <div className="flex flex-col p-20 pl-5">
        <h1 className="text-4xl">Browse and search for shows, save your favorites and more...</h1>
        <h2 className="text-3xl">Make sure to log in for the full experience</h2>
      </div>
      <div className="flex space-x-4 p-4 justify-end">
        <SearchBar />
        <div className="flex flex-col w-fit h-fit p-5 gap-5 bg-blue-50 hover:bg-blue-100 rounded-4xl">
          <div
            onClick={() => {
              setShowFilter((prev) => !prev);
            }}
          >
            Filter by genre
          </div>
          {showFilter && (
            <div className="w-fit h-fit">
              <Filter
                chosenFilters={choosenFilters}
                setChosenFilters={setChoosenFilters}
              />
              <div className="flex gap-3 mt-5">
                <button
                  onClick={handleApply}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-800 text-white rounded"
                >
                  Apply
                </button>
                <button onClick={(e) => ClearFilters(e)}>Clear</button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-10 mt-20">
        {display.map((s: Show) => (
          <Link href={`/shows/${s.id}`} key={s.id}>
            <ShowDisplay image={s.image?.medium} name={s.name} />
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
