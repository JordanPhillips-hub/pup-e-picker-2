/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Dog } from "./types";
const baseUrl = "http://localhost:3000";

const getAllDogs = async (): Promise<Dog[]> => {
  const res = await fetch(`${baseUrl}/dogs`);
  if (!res.ok) throw new Error("Cannot find dogs");
  return await res.json();
};

const postDog = async (dog: Omit<Dog, "id">): Promise<void> => {
  const res = await fetch(`${baseUrl}/dogs`, {
    body: JSON.stringify(dog),
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) throw new Error("Failed to create dog");
  return res.json();
};

const deleteDogRequest = async (id: number): Promise<void> => {
  const res = await fetch(`${baseUrl}/dog/${id}`, {
    body: "",
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete dog");
  return res.json();
};

const patchFavoriteForDog = async (
  id: number,
  isFavorite: boolean
): Promise<void> => {
  const res = await fetch(`${baseUrl}/dog/${id}`, {
    body: JSON.stringify({ isFavorite: isFavorite }),
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) throw new Error("Failed to update dog");
  return res.json();
};

export const Requests = {
  postDog,
  deleteDogRequest,
  patchFavoriteForDog,
  getAllDogs,
};
