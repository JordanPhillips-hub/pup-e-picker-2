import { DogCard } from "./DogCard";
import { useDogContext } from "../providers/DogProvider";

export const Dogs = () => {
  const { dogs } = useDogContext();
  console.log(dogs);

  return (
    <>
      {dogs.map((dog) => (
        <DogCard
          key={dog.id}
          dog={{
            id: dog.id,
            image: dog.image,
            description: dog.description,
            isFavorite: dog.isFavorite,
            name: dog.name,
          }}
          onTrashIconClick={() => alert("Trash Clicked")}
          onHeartClick={() => alert("Heart Clicked")}
          onEmptyHeartClick={() => alert("Empty Heart Clicked")}
          isLoading={false}
        />
      ))}
    </>
  );
};
