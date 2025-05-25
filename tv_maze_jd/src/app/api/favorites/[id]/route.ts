import { getShowById } from "@/app/db/statements";
import { NextRequest, NextResponse } from "next/server";


type Context = {
  params: {
    id: string;
  };
};

export async function GET(
  req: NextRequest,
  { params }: Context
) {
  const id = Number(params.id);
  const url = new URL(req.url);
  const mail = url.searchParams.get("user_mail");

  if (!mail) {
    return NextResponse.json({ message: "Email not provided" }, { status: 400 });
  }

  try {
    const show = await getShowById(id, mail);

    if (!show) {
      return NextResponse.json({ message: "Show not in favorites" }, { status: 404 });
    }

    return NextResponse.json(show, { status: 200 });
  } catch (error) {
    console.error("Error fetching show:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
