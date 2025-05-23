"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useDebounce } from "@uidotdev/usehooks";
import { Show } from "@/types";

type Result = {
  score:number;
  show: Show;
}


export default function SearchBar() {

  const [activeSearch, setActiveSearch] = useState<string>('');
  const debouncedSearchTerm = useDebounce(activeSearch, 300);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      fetch(`https://api.tvmaze.com/search/shows?q=${activeSearch}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setResults(data);
      })
      .catch((err) => console.error(err));
    }
  }, [debouncedSearchTerm])


  return (
    <form className="w-[500px] relative text-white">
      <div className="relative">
        <input type="search" placeholder="Search..." className="w-full p-4 rounded-full bg-slate-800" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setActiveSearch(e.target.value)}/>
        <button className="absolute right-1 top-1/2 -translate-y-1/2 p-4 bg-slate-900 rounded-full">
          <AiOutlineSearch/>
        </button>
      </div>

      {
        results.length > 0 && (
          <div className="absolute top-20 p-4 bg-slate-800 text-white w-full rounded-xl left-1/2 -translate-x-1/2 flex flex-col gap-2">
            {
              results.map((s:Result) => (
                <Link href={`/shows/${s.show.id}`} key={s.show.id}>
                  {s.show.name}
                </Link>
              ))
            }
          </div>
        )
      }

      
    </form>
  );
}
