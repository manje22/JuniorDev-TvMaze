import Link from "next/link";
import CastMemberDisplay from "../../../../../components/CastMemberDisplay";
import { Castmember} from "@/types";
import GetData from "@/utils/GetData";
import ScrollToTopButton from "../../../../../components/ScrollToTopButton";

export default async function ActorDetails({
  params,
}: {
  params: Promise<{id:string}>
}) {
  const {id} = await params;
  const url = `https://api.tvmaze.com/shows/${id}/cast`;

  const castData = await GetData(url);
  if (!castData) {
    throw new Error("Cast list not found");
  }

  return (
    <div>
      <div>
        <h2 className="text-7xl text-center mb-5 mt-10">Cast</h2>
        <div className="grid grid-cols-3">
          {castData.map((person: Castmember) => (
            <div className="w-fit h-fit mb-10 m-auto shadow-2xl" key={person.character.id+person.person.id}>
              <Link
                href={`../../people/${person.person.id}`}
              >
                <CastMemberDisplay person={person.person}></CastMemberDisplay>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <ScrollToTopButton></ScrollToTopButton>
    </div>
  );
}
