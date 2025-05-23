import { NextRequest, NextResponse } from "next/server";
import { insertNewShow, getShows, deleteShow, } from "../../db/statements";

 
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const mail = url.searchParams.get("user_mail");
  console.log("mail from get favs: ", mail);
  const shows = getShows(mail);
  console.log("Shows from get by user:", shows);
  return NextResponse.json(shows);
}

export async function DELETE(request: Request){
  const body = await request.json();
  console.log("From delete ", body);
  const id = Number(body.tvmaze_id);
  const mail = body.user_mail;

  console.log("What im sending for id: ", id);
  console.log("What im sending for id: ", mail);

  if (!id) {
    return NextResponse.json({error: "Id not provided"}, {status:400});
  }

  if (!mail) {
    return NextResponse.json({error: "Mail not provided"}, {status:400});
  }

  try {
    deleteShow(id, mail);
    return NextResponse.json({message: "Show deleted from favorites"});
  } catch (error) {
    console.error(error);
    return NextResponse.json({error: "Error while deleting show"}, {status:500});
  }
}


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("Body from POST: ", body);

    const { tvmaze_id, name, image, user_mail } = body;

    if (!tvmaze_id || !name || !image || !user_mail) {
      return NextResponse.json({ error: "Not all fields provided" }, { status: 400 });
    }

    const res = insertNewShow(tvmaze_id, user_mail, name, image);

    if (!res.inserted) {
      return NextResponse.json({ message: "Show already in favorites" }, { status: 200 });
    }

    return NextResponse.json({ message: "Show successfully added" }, { status: 200 });

  } catch (error) {
    console.error("Error posting", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
