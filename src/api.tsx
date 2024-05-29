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
  }).then((res): Promise<Dog> => res.json());

const deleteDogRequest = (id: number): Promise<void> =>
  fetch(`${baseUrl}/dogs/${id}`, {
    body: "",
    method: "Delete",
  }).then((res): Promise<void> => res.json());

const patchFavoriteForDog = (id: number, isFavorite: boolean): Promise<void> =>
  fetch(`${baseUrl}/dogs/${id}`, {
    body: JSON.stringify({ isFavorite: isFavorite }),
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
  })
    .then((res): Promise<void> => res.json())
    .catch((err) => console.log(err));

export const Requests = {
  postDog,
  deleteDogRequest,
  patchFavoriteForDog,
  getAllDogs,
};
