import Image from "next/image";

type ShowData = {
    show:{
        name: string;
        image:{
            medium: string;
        };
    };
};

export default async function ShowDisplay({show}: ShowData) {

    return(
        <div className="bg-blue-50 w-fit p-10 flex flex-col items-center">
            <div>
                <Image src={show.image.medium} width={300} height={300} alt="image"></Image>
            </div>
            <div>
                <p>Name: {show.name}</p>
            </div>
        </div>
    )
}