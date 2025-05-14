import { NextResponse } from "next/server";
import { insertNewShow, getShowbyId, getShows, } from "../../db/statements";

 
export async function GET() {
  const shows = getShows();
  return NextResponse.json(shows);
}

 
export async function POST(request: Request) {
  const body = await request.json();

  if (!body.tvmaze_id || !body.name || !body.image) {
    return NextResponse.json({error: "Not all fields provided"}, {status:400});
  }

  try {
    insertNewShow(body.tvmaze_id, body.name, body.image);
    return NextResponse.json({message: "Show successfully added"});
  } catch (error) {
    console.error(error);
    return NextResponse.json({error:"Something went wrong"}, {status:500});
  }
}