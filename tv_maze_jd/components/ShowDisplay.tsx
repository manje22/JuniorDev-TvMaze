"use client"

import Image from "next/image";
import globe from "../public/globe.svg"

//za prikaz serije u gridu

export default function ShowDisplay({image, name}: {image?:string, name:string}) {

    return(
        <div className="w-fit h-fit p-10 flex flex-col items-center">
            <div className="transition delay-75 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
                <Image src={image ?? globe} width={300} height={300} alt="image"></Image>
            </div>
            <div className="mt-5 text-center">
                <p className="text-2xl font-bold text-black">{name}</p>
            </div>
        </div>
    )
}