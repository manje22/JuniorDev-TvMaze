"use client"

import Image from "next/image";


export default function ShowDisplay({image, name}) {

    return(
        <div className="bg-blue-50 w-fit p-10 flex flex-col items-center">
            <div>
                <Image src={image} width={300} height={300} alt="image"></Image>
            </div>
            <div>
                <p>Name: {name}</p>
            </div>
        </div>
    )
}