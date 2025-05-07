
import { error } from "console";
import { notFound } from "next/navigation";


export default async function ShowDetails({ params }) {
  const { id } = await params;
  console.log("Id je: ", id);

  const showRes = await fetch(`https://api.tvmaze.com/shows/${id}`);

  if(!showRes.ok){
    throw new Error("Show not found");
  }

  const showData = await showRes.json();

    return(
        <div>
            {showData.name}
        </div>
    )
}
