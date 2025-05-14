
import Link from "next/link";
import ShowDisplay from "../../components/ShowDisplay";

export default async function Home() {
  const apiPageSize = 250;
  const showsPerPage = 25;

  // const [shows, setShows] = useState([]);
  // const [offset, setOffset] = useState(20);

  const showsRes = await fetch("https://api.tvmaze.com/shows");

  if (!showsRes.ok) {
    throw new Error("Show list not found");
  }

  const showData = await showsRes.json();
  console.log("show data:", showData);

  const toDisplay = showData.slice(0, 25);
  const sorted = toDisplay.sort((a, b) => a.rating.average - b.rating.average);
  console.log(sorted);


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
            {sorted.map((s:any) => (
              <Link href={`/shows/${s.id}`} key={s.id} className="w-fit m-auto" >
                <ShowDisplay image={s.image.medium} name={s.name}></ShowDisplay>
              </Link>
            ))}
          </div>
          <div>
            <button>Load more</button>
          </div>
        </div>
      </main>
    </div>
  );
}
