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
  setDogs: React.Dispatch<React.SetStateAction<Dog[]>>;
};

const DogContext = createContext<TDogContext>({} as TDogContext);
export const useDogContext = () => useContext(DogContext);

export const DogProvider = ({ children }: { children: ReactNode }) => {
  const [dogs, setDogs] = useState<Dog[]>([]);

  const refetchData = () => {
    return Requests.getAllDogs().then(setDogs);
  };

  useEffect(() => {
    void refetchData();
  }, []);

  return (
    <DogContext.Provider value={{ dogs, setDogs }}>
      {children}
    </DogContext.Provider>
  );
};
