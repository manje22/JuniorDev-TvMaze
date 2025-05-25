import { getActorById } from "@/app/db/statements";



//ovo se koristi za provjeru jeli već dodano u favorite odredenog korisnika
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  const id = Number(resolvedParams.id);

  const url = new URL(req.url);
  const mail = url.searchParams.get("user_mail");

  if (!mail) {
    return new Response(
      JSON.stringify({ message: "Email not provided", status: 400 }),
      { status: 400 }
    );
  }

  try {
    const actor = await getActorById(id, mail);

    if (!actor) {
      return new Response(
        JSON.stringify({ message: "Actor not in favorites", status: 404 }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify(actor), { status: 200 });
  } catch (error) {
    console.error("Error fetching actor:", error);
    return new Response(
      JSON.stringify({ message: "Internal server error", status: 500 }),
      { status: 500 }
    );
  }
}
