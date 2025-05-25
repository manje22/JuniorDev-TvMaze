import { NextRequest, NextResponse } from "next/server";
import { insertNewShow, getShows, deleteShow } from "../../db/statements";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const mail = url.searchParams.get("user_mail");
  console.log("mail from get favs: ", mail);

  if (!mail) {
    return NextResponse.json({ error: "Mail not provided" }, { status: 400 });
  }

  try {
    const shows = await getShows(mail);
    console.log("Shows from get by user:", shows);
    return NextResponse.json(shows);
  } catch (error) {
    console.error("Error fetching shows:", error);
    return NextResponse.json({ error: "Failed to get shows" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("From delete ", body);
    const id = Number(body.tvmaze_id);
    const mail = body.user_mail;

    console.log("What I'm sending for id: ", id);
    console.log("What I'm sending for mail: ", mail);

    if (!id) {
      return NextResponse.json({ error: "Id not provided" }, { status: 400 });
    }

    if (!mail) {
      return NextResponse.json({ error: "Mail not provided" }, { status: 400 });
    }

    const res = await deleteShow(id, mail);
    if (!res.deleted) {
      return NextResponse.json({ error: res.message || "Show not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Show deleted from favorites" });
  } catch (error) {
    console.error("Error deleting show:", error);
    return NextResponse.json({ error: "Error while deleting show" }, { status: 500 });
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

    const res = await insertNewShow(tvmaze_id, user_mail, name, image);

    if (!res.inserted) {
      return NextResponse.json({ message: "Show already in favorites" }, { status: 200 });
    }

    return NextResponse.json({ message: "Show successfully added" }, { status: 200 });
  } catch (error) {
    console.error("Error posting:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
