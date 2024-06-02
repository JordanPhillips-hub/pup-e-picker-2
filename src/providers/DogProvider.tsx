import { ReactNode, createContext, useEffect, useState } from "react";
import { Dog } from "../types";
import { Requests } from "../api";

type TDogContext = {
  dogs: Dog[];
  isLoading: boolean;
  createDog: (dog: Omit<Dog, "id">, name: string) => Promise<void>;
  deleteDog: (id: number, name: string) => Promise<Dog>;
  updateDog: (id: number, isFavorite: boolean, name: string) => Promise<Dog>;
};

export const DogContext = createContext<TDogContext>({} as TDogContext);
export const DogProvider = ({ children }: { children: ReactNode }) => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAndSetDogs = () => Requests.getAllDogs().then(setDogs);

  const handleDogRequest = (request: Promise<Dog>) => {
    return request.catch((error: Error) => {
      setDogs(dogs);
      throw error;
    });
  };

  const createDog = (dog: Omit<Dog, "id">, name: string): Promise<void> => {
    setIsLoading(true);
    return Requests.postDog(dog, name)
      .then(() => fetchAndSetDogs())
      .finally(() => setIsLoading(false));
  };

  const deleteDog = (id: number, name: string): Promise<Dog> => {
    setDogs(dogs.filter((dog) => dog.id !== id));
    return handleDogRequest(Requests.deleteDogRequest(id, name));
  };

  const updateDog = (
    id: number,
    isFavorite: boolean,
    name: string
  ): Promise<Dog> => {
    setDogs(dogs.map((dog) => (dog.id === id ? { ...dog, isFavorite } : dog)));
    return handleDogRequest(Requests.patchFavoriteForDog(id, isFavorite, name));
  };

  useEffect(() => {
    fetchAndSetDogs().catch((err) => console.error("Error fetching dogs", err));
  }, []);

  return (
    <DogContext.Provider
      value={{ dogs, isLoading, createDog, deleteDog, updateDog }}
    >
      {children}
    </DogContext.Provider>
  );
};
