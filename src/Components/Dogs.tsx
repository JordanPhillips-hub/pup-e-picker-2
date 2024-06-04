import { DogCard } from "./DogCard";
import { useDogContext, useNavigationContext } from "../hooks/api.hooks";
import { TActiveTab, Dog } from "../types";

export const Dogs = () => {
  const { currentView } = useNavigationContext();
  const {
    isLoading,
    dogs,
    favoritedDogs,
    unfavoritedDogs,
    deleteDog,
    updateDog,
  } = useDogContext();

  const dogsList: Record<TActiveTab, Dog[]> = {
    favorited: favoritedDogs,
    unfavorited: unfavoritedDogs,
    allDogs: dogs,
    "create dog": [],
  };

  return (
    <>
      {dogsList[currentView].map(
        ({ id, image, description, isFavorite, name }) => (
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
        )
      )}
    </>
  );
};
