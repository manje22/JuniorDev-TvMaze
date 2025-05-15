import { NextResponse } from "next/server";
import { insertNewShow, getShowbyId, getShows, deleteShow, } from "../../db/statements";
import { error } from "console";

 
export async function GET() {
  const shows = getShows();
  return NextResponse.json(shows);
}

export async function DELETE(request: Request){
  const body = await request.json();
  console.log("From delete ", body);
  const id = Number(body.tvmaze_id);
  console.log("What im sending for id: ", id);

  if (!id) {
    return NextResponse.json({error: "Id not provided"}, {status:400});
  }

  try {
    deleteShow(id);
    return NextResponse.json({message: "Show deleted from favorites"});
  } catch (error) {
    console.error(error);
    return NextResponse.json({error: "Error while deleting show"}, {status:500});
  }
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