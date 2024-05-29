import { DogCard } from "./DogCard";
import { useDogContext } from "../providers/DogProvider";
import { useNavigationContext } from "../providers/NavigationProvider";

export const Dogs = () => {
  const { dogs, deleteDog, updateDog } = useDogContext();
  const { currentView } = useNavigationContext();

  const filteredDogs = dogs.filter((dog) => {
    if (currentView === "favorited") return dog.isFavorite;
    if (currentView === "unfavorited") return !dog.isFavorite;
    return true;
  });

  return (
    <>
      {filteredDogs.map((dog) => (
        <DogCard
          key={dog.id}
          dog={{
            id: dog.id,
            image: dog.image,
            description: dog.description,
            isFavorite: dog.isFavorite,
            name: dog.name,
          }}
          onTrashIconClick={() => deleteDog(dog.id)}
          onHeartClick={() => updateDog(dog.id, !dog.isFavorite)}
          onEmptyHeartClick={() => updateDog(dog.id, !dog.isFavorite)}
          isLoading={false}
        />
      ))}
    </>
  );
};
