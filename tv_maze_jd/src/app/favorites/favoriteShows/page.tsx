import ShowDisplay from "../../../../components/ShowDisplay";

type Props ={
    params: {id:string};
};

export default async function ShowFavorites({ params }: Props) {
    const res = await fetch("http://localhost:3000/api/favorites");

    const favorites = await res.json();
    console.log("favorite shows", favorites);

  return(
    <div>
      {favorites.map((f) => [
        <ShowDisplay image={f.image} name={f.name}></ShowDisplay>
      ])}
    </div>
  )
}