import Link from "next/link";
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

export default function SearchBar() {

  const [activeSearch, setActiveSearch] = useState([]);

  const handleSearch = (e) => {
    if (e.target.value == "") {
      setActiveSearch([]);
      return false;
    }
    console.log(e.target.value);
    fetch(`https://api.tvmaze.com/search/shows?q=${e.target.value}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setActiveSearch(data);
      })
      .catch((err) => console.error(err));
  }

  return (
    <form className="w-[500px] relative text-white">
      <div className="relative">
        <input type="search" placeholder="Search..." className="w-full p-4 rounded-full bg-slate-800" onChange={(e) => handleSearch(e)}/>
        <button className="absolute right-1 top-1/2 -translate-y-1/2 p-4 bg-slate-900 rounded-full">
          <AiOutlineSearch/>
        </button>
      </div>

      {
        activeSearch.length > 0 && (
          <div className="absolute top-20 p-4 bg-slate-800 text-white w-full rounded-xl left-1/2 -translate-x-1/2 flex flex-col gap-2">
            {
              activeSearch.map((s) => (
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
