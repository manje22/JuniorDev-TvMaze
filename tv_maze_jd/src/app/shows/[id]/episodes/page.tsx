export default async function ShowDetails({ params }) {
    const id = await params;
    console.log(id,"hello from episode page");
    return(
        <div>episode</div>
    )
}