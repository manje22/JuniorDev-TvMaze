"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const apiPageSize = 250;
  const showsPerPage = 25;

  const [shows, setShows] = useState([]);
  const [offset, setOffset] = useState(20);

  useEffect(() => {
    fetch("https://api.tvmaze.com/shows")
      .then((res) => res.json())
      .then((data) => {
        const startIndex = offset % apiPageSize;
        const endIndex = startIndex + showsPerPage;
        const toDisplay = data.slice(startIndex, endIndex);
        const sorted = toDisplay.sort((a,b) => a.rating.average - b.rating.average);
        console.log(sorted);
        setShows(sorted);
      });
  }, [offset]);


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
          <div className="text-center">ovde ide trazilica</div>
          <div className="flex flex-col items-center">
            <ul>
              {shows.map((s) => (
                <li key={s.id}>
                  <Link href={`/shows/${s.id}`}>{s.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <button>Load more</button>
          </div>
        </div>
      </main>
    </div>
  );
}
