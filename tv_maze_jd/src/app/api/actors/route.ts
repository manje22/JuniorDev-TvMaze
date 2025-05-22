import { NextRequest, NextResponse } from "next/server";
import { insertNewActor, getActors, deleteActor } from "../../db/statements";

 
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const url = new URL(req.url);
  const mail = url.searchParams.get("user_mail");
  console.log("mail from get actor favs: ", mail);
  const actors = getActors(mail);
  console.log("Actors from get by user:", actors);
  return NextResponse.json(actors);
}

export async function DELETE(request: Request){
  const body = await request.json();
  console.log("From delete ", body);
  const id = Number(body.tvmaze_id);
  const mail = body.user_mail;

  console.log("What im sending for id - actors: ", id);
  console.log("What im sending for mail - actors: ", mail);

  if (!id) {
    return NextResponse.json({error: "Id not provided"}, {status:400});
  }

  if (!mail) {
    return NextResponse.json({error: "Mail not provided"}, {status:400});
  }

  try {
    deleteActor(id, mail);
    return NextResponse.json({message: "Actor deleted from favorites"});
  } catch (error) {
    console.error(error);
    return NextResponse.json({error: "Error while deleting actor"}, {status:500});
  }
}


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("Body from POST actor: ", body);

    const { tvmaze_id, name, image, user_mail } = body;

    if (!tvmaze_id || !name || !image || !user_mail) {
      return NextResponse.json({ error: "Not all fields provided" }, { status: 400 });
    }

    const res = insertNewActor(tvmaze_id, user_mail, name, image);

    if (!res.inserted) {
      return NextResponse.json({ message: "Actor already in favorites" }, { status: 200 });
    }

    return NextResponse.json({ message: "Actor successfully added" }, { status: 200 });

  } catch (error) {
    console.error("Error posting", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
