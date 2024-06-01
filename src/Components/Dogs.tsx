import { DogCard } from "./DogCard";
import { useDogContext, useNavigationContext } from "../hooks/api";
import toast from "react-hot-toast";

export const Dogs = () => {
  const { dogs, deleteDog, updateDog } = useDogContext();
  const { currentView } = useNavigationContext();

  const filteredDogs = dogs.filter((dog) => {
    if (currentView === "favorited") return dog.isFavorite;
    if (currentView === "unfavorited") return !dog.isFavorite;
    return true;
  });

  const messages = (name: string) => ({
    deleted: `${name} has been deleted`,
    favorite: `${name} added to favorites`,
    unFavorite: `${name} removed from favorites`,
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
          onTrashIconClick={() => {
            toast.success(messages(name).deleted);
            return deleteDog(id);
          }}
          onHeartClick={() => {
            toast.success(messages(name).unFavorite);
            return updateDog(id, !isFavorite);
          }}
          onEmptyHeartClick={() => {
            toast.success(messages(name).favorite);
            return updateDog(id, !isFavorite);
          }}
          isLoading={false}
        />
      ))}
    </>
  );
};
