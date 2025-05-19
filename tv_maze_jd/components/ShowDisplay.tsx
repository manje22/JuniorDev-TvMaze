"use client"

import Image from "next/image";


export default function ShowDisplay({image, name}: {image:string, name:string}) {

    return(
        <div className="w-fit p-10 flex flex-col items-center shadow-md transition delay-75 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:shadow-lg">
            <div>
                <Image src={image} width={300} height={300} alt="image"></Image>
            </div>
            <div className="mt-5 text-center">
                <p className="text-2xl font-bold">{name}</p>
            </div>
        </div>
    )
}