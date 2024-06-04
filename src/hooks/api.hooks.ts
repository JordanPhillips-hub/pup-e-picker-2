import { useContext } from "react";
import { NavigationContext } from "../providers/NavigationProvider";
import { DogContext } from "../providers/DogProvider";

export const useNavigationContext = () => useContext(NavigationContext);
export const useDogContext = () => useContext(DogContext);
