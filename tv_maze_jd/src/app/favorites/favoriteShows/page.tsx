
type Props ={
    params: {id:string};
};

export default async function ShowFavorites({ params }: Props) {
    const res = await fetch("http://localhost:3000/api/favorites")
    .then((res) => res.json())
    .then((data)=> console.log(data))

  return <div>Fav shows :P</div>;
}