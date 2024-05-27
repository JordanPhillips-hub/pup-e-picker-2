import { Dog } from "./types";

const baseUrl = "http://localhost:3000";
const getAllDogs = async () => {
  const res = await fetch(`${baseUrl}/dogs`);
  if (!res.ok) {
    throw new Error("Cannot find dogs");
  }
  return (await res.json()) as Promise<Dog[]>;
};

const postDog = async () => {
  // fill out method
};
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
