import Image from "next/image";
import { Actor } from "@/types";

interface CastMemberDisplayProps {
  person: Actor;
}

export default function CastMemberDisplay({ person }: CastMemberDisplayProps) {
  const data = person;
  return (
    <div className="w-fit h-fit p-10 flex flex-col items-center">
      <div className="transition delay-75 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
        {data.image?.medium ? (
          <Image
            src={data.image?.medium}
            width={300}
            height={300}
            alt="image"
          ></Image>
        ) : (
          <Image
            src={"/globe.svg"}
            width={300}
            height={300}
            alt="no image"
          ></Image>
        )}
      </div>
      <div className="mt-5 text-center">
        <p className="text-2xl font-bold">{data.name || "no name available"}</p>
      </div>
    </div>
  );
}
