import { NextRequest, NextResponse } from "next/server";
import { insertNewActor, getActors, deleteActor } from "../../db/statements";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const mail = url.searchParams.get("user_mail");

  if (!mail) {
    return NextResponse.json({ error: "Email not provided" }, { status: 400 });
  }

  try {
    const actors = await getActors(mail);
    return NextResponse.json(actors, { status: 200 });
  } catch (error) {
    console.error("Error fetching actors:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const body = await request.json();
  const id = Number(body.tvmaze_id);
  const mail = body.user_mail;

  if (!id) {
    return NextResponse.json({ error: "Id not provided" }, { status: 400 });
  }

  if (!mail) {
    return NextResponse.json({ error: "Mail not provided" }, { status: 400 });
  }

  try {
    await deleteActor(id, mail);
    return NextResponse.json({ message: "Actor deleted from favorites" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting actor:", error);
    return NextResponse.json({ error: "Error while deleting actor" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tvmaze_id, name, image, user_mail } = body;

    if (!tvmaze_id || !name || !image || !user_mail) {
      return NextResponse.json({ error: "Not all fields provided" }, { status: 400 });
    }

    const res = await insertNewActor(tvmaze_id, user_mail, name, image);

    if (!res.inserted) {
      return NextResponse.json({ message: "Actor already in favorites" }, { status: 200 });
    }

    return NextResponse.json({ message: "Actor successfully added" }, { status: 200 });
  } catch (error) {
    console.error("Error posting actor:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
