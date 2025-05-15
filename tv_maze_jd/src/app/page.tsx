"use client"

import Link from "next/link";
import ShowDisplay from "../../components/ShowDisplay";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(0)
  const [showData, setShowData] = useState([]);
  const {ref, inView} = useInView();

  useEffect(() => {
    fetch(
      `https://api.tvmaze.com/shows?page=${currentPage}`
    ).then((res) => res.json())
    .then((data) => {
      setShowData((prev) => [...prev, ...data]);
    })
    .catch((error) => console.log("showdata error", error))
  }, [currentPage]);

  useEffect(() => {
    if (inView) {
      setCurrentPage((prev)=> prev+1);
    }
  }, [inView]);



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
          <div className="grid grid-cols-4 mt-20 gap-10">
            {showData.map((s:any) => (
              <Link href={`/shows/${s.id}`} key={s.id} className="w-fit m-auto" >
                <ShowDisplay image={s.image.medium} name={s.name}></ShowDisplay>
              </Link>
            ))}
          </div>
        </div>
        <div ref={ref}>
          Loading...
        </div>
      </main>
    </div>
  );
}
