import Image from "next/image";

type Props ={
    params: {id:string};
};


export default async function ActorDetails({params}: Props) {
    const actorId = params.id;
    console.log(actorId,"hello from actor detail page");
    

    const actorDetails = await fetch(`https://api.tvmaze.com/people/${actorId}?embed=castcredits`);

    if (!actorDetails.ok) {
        throw new Error("Actor details not found");
    }

    const actorData = await actorDetails.json();
    console.log(actorData);

    return(
        <div>
            <div>
                <Image src={actorData.image.original} width={500} height={300} alt="image"></Image>
            </div>
            <div>
                <p>Name: {actorData.name}</p>
                <p>County: {actorData.country?.name || "n/a"}</p>
                <p>Birthday: {actorData.birthday}</p>
            </div>
            <div>
                <p>Appears in:</p>
                <div>
                    nek ovde idu baren imena serija i imena lika kojeg su glumili, dodat link na str sa page info?
                </div>
            </div>
        </div>
    )
}