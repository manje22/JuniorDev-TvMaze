import Link from "next/link";
import CastMemberDisplay from "../../../../../components/CastMemberDisplay"
//make castMemdisplay

type Props ={
    params: {id:string};
};

export default async function ShowCast({params}: Props) {
    const id = params.id;
    console.log(id,"hello from cast page");
    

    const castRes = await fetch(`https://api.tvmaze.com/shows/${id}/cast`);

    if (!castRes.ok) {
        throw new Error("Cast list not found");
    }

    const castData = await castRes.json();
    console.log("Cast data:", castData);
    return(
        <div>
            <div>
                <p>Ode ce ic slika</p>
                <h1>Naziv serije</h1>
            </div>
            <div>
                <h2>Cast:</h2>
                <div>
                    {castData.map((person: any) => (
                        <Link href={`../../people/${person.person.id}`}>
                            <CastMemberDisplay key={person.person.id} person={person}></CastMemberDisplay>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}