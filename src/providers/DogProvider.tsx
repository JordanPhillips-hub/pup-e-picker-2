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

  const fetchData = () => Requests.getAllDogs().then(setDogs);
  const handleRequest = async (promise: Promise<Dog>) => {
    const request = await promise;
    await fetchData();
    return request;
  };

  const createDog = (dog: Omit<Dog, "id">): Promise<Dog> =>
    handleRequest(Requests.postDog(dog));

  const deleteDog = (id: number): Promise<Dog> =>
    handleRequest(Requests.deleteDogRequest(id));

  const updateDog = (id: number, isFavorite: boolean): Promise<Dog> =>
    handleRequest(Requests.patchFavoriteForDog(id, isFavorite));

  useEffect(() => {
    fetchData().catch((err) => console.error("Error fetching dogs", err));
  }, []);

  return (
    <DogContext.Provider value={{ dogs, createDog, deleteDog, updateDog }}>
      {children}
    </DogContext.Provider>
  );
};
