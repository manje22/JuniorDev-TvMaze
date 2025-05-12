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
        <div>
            <div>
                <Image src={show.image.medium} width={50} height={50} alt="image"></Image>
            </div>
            <div>
                <p>Name: {show.name}</p>
            </div>
        </div>
    )
}