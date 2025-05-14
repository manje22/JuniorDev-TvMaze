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
        <h2>Show Menu</h2>
        <nav>
          <ul>
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
              <Link href={'/favorites/favoriteShows'}>Favorite shows</Link>
            </li>
          </ul>
        </nav>
        <BackButton></BackButton>
      </aside>
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
