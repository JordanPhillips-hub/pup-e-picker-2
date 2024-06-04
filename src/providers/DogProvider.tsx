import { ReactNode, createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Dog } from "../types";
import { Requests } from "../api";

type TDogContext = {
  dogs: Dog[];
  isLoading: boolean;
  favoritedDogs: Dog[];
  unfavoritedDogs: Dog[];
  createDog: (dog: Omit<Dog, "id">, name: string) => Promise<void>;
  deleteDog: (id: number, name: string) => Promise<void | string>;
  updateDog: (
    id: number,
    isFavorite: boolean,
    name: string
  ) => Promise<void | string>;
};

export const DogContext = createContext<TDogContext>({} as TDogContext);
export const DogProvider = ({ children }: { children: ReactNode }) => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const favoritedDogs = dogs.filter((dog) => dog.isFavorite);
  const unfavoritedDogs = dogs.filter((dog) => !dog.isFavorite);

  const messages = {
    successBase: "has been successfully",
    errorBase: "Sorry we have encountered an error",
  };

  const setMessage = (name: string, type: keyof typeof messages) => {
    if (!messages[type]) return;
    return {
      create: `${name} ${messages[type]} created`,
      delete: `${name} ${messages[type]} deleted`,
      update: `${name} ${messages[type]} updated`,
    };
  };

  const fetchAndSetDogs = () => Requests.getAllDogs().then(setDogs);

  const handleDogRequest = (request: Promise<void>, msg: string) => {
    return request
      .then(() => toast.success(msg))
      .catch((error: Error) => {
        toast.error(messages.errorBase);
        setDogs(dogs);
        throw error;
      });
  };

  const createDog = (dog: Omit<Dog, "id">, name: string) => {
    setIsLoading(true);
    const successMessage = setMessage(name, "successBase")?.create;
    return handleDogRequest(
      Requests.postDog(dog),
      successMessage || "Dog created successfully"
    )
      .then(() => fetchAndSetDogs())
      .finally(() => setIsLoading(false));
  };

  const deleteDog = (id: number, name: string) => {
    setDogs(dogs.filter((dog) => dog.id !== id));
    const successMessage = setMessage(name, "successBase")?.delete;
    return handleDogRequest(
      Requests.deleteDogRequest(id),
      successMessage || "Dog deleted successfully"
    );
  };

  const updateDog = (id: number, isFavorite: boolean, name: string) => {
    setDogs(dogs.map((dog) => (dog.id === id ? { ...dog, isFavorite } : dog)));
    const successMessage = setMessage(name, "successBase")?.update;
    return handleDogRequest(
      Requests.patchFavoriteForDog(id, isFavorite),
      successMessage || "Dog updated successfully"
    );
  };

  useEffect(() => {
    fetchAndSetDogs().catch((err) => console.error("Error fetching dogs", err));
  }, []);

  return (
    <DogContext.Provider
      value={{
        dogs,
        isLoading,
        favoritedDogs,
        unfavoritedDogs,
        createDog,
        deleteDog,
        updateDog,
      }}
    >
      {children}
    </DogContext.Provider>
  );
};
