import { ReactNode, createContext, useEffect, useState } from "react";
import { Dog } from "../types";
import { Requests } from "../api";

type TDogContext = {
  dogs: Dog[];
  createDog: (dog: Omit<Dog, "id">) => Promise<Dog>;
  deleteDog: (id: number) => Promise<Dog>;
  updateDog: (id: number, isFavorite: boolean) => Promise<Dog>;
};

export const DogContext = createContext<TDogContext>({} as TDogContext);
export const DogProvider = ({ children }: { children: ReactNode }) => {
  const [dogs, setDogs] = useState<Dog[]>([]);

  // Set Loading State
  const createDog = (dog: Omit<Dog, "id">): Promise<Dog> =>
    Requests.postDog(dog);

  const deleteDog = (id: number): Promise<Dog> => {
    setDogs(dogs.filter((dog) => dog.id !== id));
    return Requests.deleteDogRequest(id).catch((error: Error) => {
      setDogs(dogs);
      throw error;
    });
  };

  const updateDog = (id: number, isFavorite: boolean): Promise<Dog> => {
    setDogs(dogs.map((dog) => (dog.id === id ? { ...dog, isFavorite } : dog)));
    return Requests.patchFavoriteForDog(id, isFavorite).catch(
      (error: Error) => {
        setDogs(dogs);
        throw error;
      }
    );
  };

  useEffect(() => {
    Requests.getAllDogs()
      .then(setDogs)
      .catch((err) => console.error("Error fetching dogs", err));
  }, []);

  return (
    <DogContext.Provider value={{ dogs, createDog, deleteDog, updateDog }}>
      {children}
    </DogContext.Provider>
  );
};
