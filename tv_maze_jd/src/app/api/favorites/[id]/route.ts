import { getShowbyId, deleteShow } from "@/app/db/statements";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { id: string } }) {
    const id = Number(params.id); 
    const show = getShowbyId(id);
    if (!show) {
        return NextResponse.json({message: "Show not in favs", status: 404});
    }

    return NextResponse.json(show);
}

export async function DELETE({params}: {params:{id:string}}){
    const id = Number(params.id);
    const res = deleteShow(id);
    return NextResponse.json(res);
}