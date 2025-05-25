import Link from "next/link";
import BackButton from "../../../../components/BackButton";

export default async function ShowLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const { id } = params;
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
