"use client";
//https://www.freecodecamp.org/news/how-to-make-a-filter-component-in-react/

export default function Filter({
  chosenFilters,
  setChosenFilters,
}: {
  chosenFilters: string[];
  setChosenFilters: CallableFunction;
}) {
  const filterValues = [
    "Drama",
    "Crime",
    "Mystery",
    "Adventure",
    "Supernatural",
    "Action",
    "Family",
    "Romance",
    "Sci-fi",
    "Comedy",
    "Fantasy",
    "Horror",
  ];

  //dodaje se filter u niz
  const addFilter = (filter: string) => {
    if (!chosenFilters.includes(filter)) {
      setChosenFilters((prev: string) => [...prev, filter]);
    }
  };

  const removeFilter = (filter: string) => {
    if (chosenFilters.includes(filter)) {
      const removedList = chosenFilters.filter((item) => item !== filter);
      setChosenFilters(removedList);
    }
  };

  return (
    <div className="relative w-full h-[15%] flex items-center overflow-x-auto">
      <div className="grid grid-cols-3 gap-3">
        {filterValues.map((genre) => (
          <div
            key={genre}
            onClick={() => {
              if (chosenFilters.includes(genre)) {
                removeFilter(genre);
              } else {
                addFilter(genre);
              }
            }}
            className={`w-fit min-w-fit h-8 mx-2 px-5 py-2 justify-center items-center text-sm break-keep rounded-3xl cursor-pointer transition-all duration-300 ${
              chosenFilters.includes(genre)
                ? "border-blue-500 bg-blue-500 text-white"
                : " border-gray-500 bg-blue-100 text-gray-900"
            } `}
          >
            {genre.split("-").join(" ")}
          </div>
        ))}
      </div>
    </div>
  );
}
