import { getShowbyId } from "@/app/db/statements";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);

  const url = new URL(req.url);
  const mail = url.searchParams.get("user_mail");

  if (!mail) {
    return new Response(
      JSON.stringify({ message: "Email not provided", status: 400 }),
      { status: 400 }
    );
  }

  const show = getShowbyId(id, mail);

  if (!show) {
    return new Response(
      JSON.stringify({ message: "Show not in favorites", status: 404 }),
      { status: 404 }
    );
  }

  return new Response(JSON.stringify(show), { status: 200 });
}
