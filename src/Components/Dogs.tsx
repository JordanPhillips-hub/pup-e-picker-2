import { DogCard } from "./DogCard";
import { useDogContext, useNavigationContext } from "../hooks/api";

export const Dogs = () => {
  const { isLoading, dogs, deleteDog, updateDog } = useDogContext();
  const { currentView } = useNavigationContext();

  const filteredDogs = dogs.filter((dog) => {
    if (currentView === "favorited") return dog.isFavorite;
    if (currentView === "unfavorited") return !dog.isFavorite;
    return true;
  });

  return (
    <>
      {filteredDogs.map(({ id, image, description, isFavorite, name }) => (
        <DogCard
          key={id}
          dog={{
            id: id,
            image: image,
            description: description,
            isFavorite: isFavorite,
            name: name,
          }}
          onTrashIconClick={() => deleteDog(id, name)}
          onHeartClick={() => updateDog(id, !isFavorite, name)}
          onEmptyHeartClick={() => updateDog(id, !isFavorite, name)}
          isLoading={isLoading}
        />
      ))}
    </>
  );
};
