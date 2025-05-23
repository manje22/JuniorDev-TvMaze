import Image from "next/image";
import { Actor } from "@/types";

interface CastMemberDisplayProps {
  person: Actor;
}

export default function CastMemberDisplay({ person }: CastMemberDisplayProps) {
    const data = person;
    console.log("Person: ", person);
    return(
        <div>
            <div>
                {data.image?.medium ? 
                    <Image src={data.image?.medium} width={50} height={50} alt="image"></Image> :
                    <div className="w-[50px] h-[50px] bg-black text-white">No Image</div>
                }
            </div>
            <div>
                <p>Name: {data.name || "n/a"}</p>
                <p>Date of birth: {data.birthday || "n/a"}</p>
                <p>Country of origin: {data.country?.name || "n/a"}</p>
            </div>
        </div>
    )
}