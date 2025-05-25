export default async function GetData(url:string) {
    const res = await fetch(url);

    if (!res.ok) {
        return undefined;
    }
    const data = await res.json();
    console.log("Get data ", data);
    return data;
  }


  //pomocna funckija za dohvacanje podataka, ovo je bila logika koja se ponavljala