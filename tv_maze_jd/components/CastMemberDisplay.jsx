import Image from "next/image";

export default async function CastMemberDisplay({ person }) {
    const data = await person.person;
    console.log(data);
    return(
        <div>
            <div>
                <Image src={data.image.medium} width={50} height={50} alt="image"></Image>
            </div>
            <div>
                <p>Name: {data.name}</p>
                <p>Date of birth: {data.birthday}</p>
                <p>Country of origin: {data.country.name}</p>
            </div>
        </div>
    )
}