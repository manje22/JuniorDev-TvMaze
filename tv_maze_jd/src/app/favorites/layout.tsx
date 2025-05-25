import { MyProps } from "@/types";

export async function generateMetadata() {
 
  return {
    title: `Tv encyclopedia │ Favorites`,
    description: `Browse favorites`,
  };
}


export default async function FavoritesLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {

  return (
    <div className="flex">
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
