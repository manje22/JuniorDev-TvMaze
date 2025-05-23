import Link from "next/link";
import CastMemberDisplay from "../../../../../components/CastMemberDisplay";
import { Castmember, MyProps } from "@/types";
import GetData from "@/utils/GetData";

export default async function ShowCast({ params }: MyProps) {
  const id = params.id;
  const url = `https://api.tvmaze.com/shows/${id}/cast`;

  const castData = await GetData(url);
  if (!castData) {
    throw new Error("Cast list not found");
  }

  return (
    <div>
      <div>
        <h2>Cast:</h2>
        <div>
          {castData.map((person: Castmember) => (
            <Link
              href={`../../people/${person.person.id}`}
              key={person.character.id}
            >
              <CastMemberDisplay person={person.person}></CastMemberDisplay>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
