
export async function generateMetadata() {
 
  return {
    title: `Tv encyclopedia │ Actors`,
    description: `Browse actors`,
  };
}


export default async function PeopleLayout({
  children
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="flex">
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
