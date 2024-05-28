import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Dog } from "../types";
import { Requests } from "../api";

type TDogContext = {
  dogs: Dog[];
  createDog: (dog: Omit<Dog, "id">) => Promise<Dog>;
};

const DogContext = createContext<TDogContext>({} as TDogContext);
export const useDogContext = () => useContext(DogContext);

export const DogProvider = ({ children }: { children: ReactNode }) => {
  const [dogs, setDogs] = useState<Dog[]>([]);

  const fetchData = () => Requests.getAllDogs().then(setDogs);

  const createDog = async (dog: Omit<Dog, "id">): Promise<Dog> => {
    const newDog = await Requests.postDog(dog);
    await fetchData();
    return newDog;
  };

  useEffect(() => {
    fetchData().catch((err) => console.log(err));
  }, []);

  return (
    <DogContext.Provider value={{ dogs, createDog }}>
      {children}
    </DogContext.Provider>
  );
};
