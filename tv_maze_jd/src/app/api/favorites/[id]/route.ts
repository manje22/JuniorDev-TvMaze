import { getShowById } from "@/app/db/statements";
import { NextRequest, NextResponse } from "next/server";


export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  const id = Number(resolvedParams.id);

  const url = new URL(req.url);
  const mail = url.searchParams.get("user_mail");

  if (!mail) {
    return NextResponse.json(
      { message: "Email not provided" },
      { status: 400 }
    );
  }

  try {
    const show = await getShowById(id, mail);

    if (!show) {
      return NextResponse.json(
        { message: "Show not in favorites" },
        { status: 404 }
      );
    }

    return NextResponse.json(show, { status: 200 });
  } catch (error) {
    console.error("Error fetching show:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
