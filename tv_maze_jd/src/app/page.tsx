"use client"

import Link from "next/link";
import ShowDisplay from "../../components/ShowDisplay";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import SearchBar from "../../components/SearchBar";
import Filter from "../../components/Filter";
import ScrollToTopButton from "../../components/ScrollToTopButton";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(0)
  const [showData, setShowData] = useState([]);
  const {ref, inView} = useInView();
  const viewPerPage = 24;
  const [display, setDisplay] = useState([]);
  const [displayCount, setDisplayCount] = useState(0);

  //Za trazlicu

  useEffect(() => {
    console.log("Data:",showData.length);
    fetch(
      `https://api.tvmaze.com/shows?page=${currentPage}`
    ).then((res) => res.json())
    .then((data) => {
      data.sort((first:any, second:any) => second.rating.average-first.rating.average);
      setShowData((prev) => {
        const noDuplicates = data.filter((show) => !prev.some((s)=> s.id === show.id));
        return [...prev, ...noDuplicates];
      });
      console.log("Show data:", data);
    })
    .catch((error) => console.log("showdata error", error))
  }, [currentPage]);

  useEffect(() => {
    if (inView) {
      if (displayCount < showData.length) {
        const nextGroup = showData.slice(displayCount, displayCount + viewPerPage);
        setDisplay((prev) => [...prev, ...nextGroup]);
        setDisplayCount((prev) => prev + viewPerPage);
      } else {
        setCurrentPage((prev) => prev + 1);
      }
    }
  }, [inView]);

  useEffect(() => {
    const nextGroup = showData.slice(
      displayCount,
      displayCount + viewPerPage
    );
    if (nextGroup.length > 0) {
      setDisplay((prev) => [...prev, ...nextGroup]);
      setDisplayCount((prev) => prev + viewPerPage);
    }
  }, [showData]);

  return (
    <div className="">
      <main className="flex flex-col">
        <div className="text-center bg-blue-50 p-10">
          <h1 className="text-5xl mb-8">Dobrodošli</h1>
          <h2 className="text-3xl mb-10">
            Ovdje možete pregledavati serije, epizode i glumce
          </h2>
        </div>
        <div>
          <div className="text-center">
            <SearchBar></SearchBar>
          </div>
          <div>
            <div className="grid grid-cols-4 mt-20 gap-10">
            {display.map((s:any) => (
              <Link href={`/shows/${s.id}`} key={s.id} className="w-fit m-auto" >
                <ShowDisplay image={s.image.medium} name={s.name}></ShowDisplay>
              </Link>
            ))}
          </div>
          </div>
          <ScrollToTopButton></ScrollToTopButton>
        </div>
        <div ref={ref}>
          Loading...
        </div>
      </main>
    </div>
  );
}
