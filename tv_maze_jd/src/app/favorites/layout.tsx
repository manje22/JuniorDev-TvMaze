//ovaj layout je napravljen samo da mogu dodat meta data

export async function generateMetadata() {
 
  return {
    title: `Tv encyclopedia │ Favorites`,
    description: `Browse favorites`,
  };
}


export default async function FavoritesLayout({
  children
}: {
  children: React.ReactNode
}) {

  return (
    <div className="flex">
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
