import Link from "next/link";
import BackButton from "../../../../components/BackButton";




export async function generateMeta({
  params,
}: {
  params: Promise<{id:string}>
}) {
  const {id} = await params;
  const showRes = await fetch(`https://api.tvmaze.com/shows/${id}?embed=cast`);
  if (!showRes.ok) return { title: "Show not found" };
 
  const data = await showRes.json();
 
  const image = data.image.medium;
 
  return {
    title: `Tv encyclopedia │ ${data.name}`,
    description: `${data.name} details`,
    openGraph: {
      images: [{ url: image, width: 400, height: 400 }],
    }
  };
}



export default async function ShowLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{id:string}>
}) {
  const {id} = await params;
  return (
    <div className="flex">
      <aside className="w-[200px] bg-amber-100">
        <h1 className="text-3xl mb-5">Show Menu</h1>
        <nav>
          <ul className="flex flex-col gap-4">
            <li>
              <Link href={`/shows/${id}/cast`}>
                Click here to view cast members
              </Link>
            </li>
            <li>
              <Link href={`/shows/${id}/episodes`}>
                Click here to view episodes
              </Link>
            </li>
            <li>
              <Link href={'/favorites/favoriteShows'}>View Your Favorite shows</Link>
            </li>
          </ul>
        </nav>
        <div className="mt-10">
          <BackButton></BackButton>
        </div>
      </aside>
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
