import { Dog } from "./types";

const baseUrl = "http://localhost:3000";
const getAllDogs = (): Promise<Dog[]> =>
  fetch(`${baseUrl}/dogs`).then((res): Promise<Dog[]> => res.json());

const postDog = (dog: Omit<Dog, "id">): Promise<Dog> =>
  fetch(`${baseUrl}/dogs`, {
    body: JSON.stringify(dog),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response): Promise<Dog> => response.json());

const deleteDogRequest = () => {
  // fill out method
};

const patchFavoriteForDog = () => {
  // fill out method
};

export const Requests = {
  postDog,
  deleteDogRequest,
  patchFavoriteForDog,
  getAllDogs,
};
