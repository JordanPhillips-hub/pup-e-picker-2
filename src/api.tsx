import toast from "react-hot-toast";
import { Dog } from "./types";

const baseUrl = "http://localhost:3000";
const messages = {
  successBase: "has been successfully",
  errorBase: "Sorry we have encountered an error",
};

const successMessages = (name: string) => ({
  create: `${name} ${messages.successBase} created`,
  delete: `${name} ${messages.successBase} deleted`,
  favorite: `${name} ${messages.successBase} added to your favorites`,
  unFavorite: `${name} ${messages.successBase} removed from your favorites`,
});

const errorMessages = (name: string) => ({
  create: `${messages.errorBase} creating ${name}`,
  delete: `${messages.errorBase} deleting ${name}`,
  favorite: `${messages.errorBase} adding ${name} to your favorites`,
  unFavorite: `${messages.errorBase} removing ${name} from your favorites`,
});

const handleResponse = async (
  res: Response,
  successMsg: string,
  errorMsg: string
): Promise<Dog> => {
  if (!res.ok) {
    toast.error(errorMsg);
    throw new Error("Request failed");
  }
  toast.success(successMsg);
  return (await res.json()) as Dog;
};

const postDog = async (dog: Omit<Dog, "id">, name: string): Promise<Dog> => {
  const res = await fetch(`${baseUrl}/dogs`, {
    body: JSON.stringify(dog),
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  return handleResponse(
    res,
    successMessages(name).create,
    errorMessages(name).create
  );
};

const deleteDogRequest = async (id: number, name: string): Promise<Dog> => {
  const res = await fetch(`${baseUrl}/dogs/${id}`, {
    body: "",
    method: "DELETE",
  });

  return handleResponse(
    res,
    successMessages(name).delete,
    errorMessages(name).delete
  );
};

const patchFavoriteForDog = async (
  id: number,
  isFavorite: boolean,
  name: string
): Promise<Dog> => {
  const res = await fetch(`${baseUrl}/dogs/${id}`, {
    body: JSON.stringify({ isFavorite: isFavorite }),
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
  });

  const successMsg = isFavorite
    ? successMessages(name).favorite
    : successMessages(name).unFavorite;
  const errorMsg = isFavorite
    ? errorMessages(name).favorite
    : errorMessages(name).unFavorite;

  return handleResponse(res, successMsg, errorMsg);
};

const getAllDogs = async (): Promise<Dog[]> => {
  const res = await fetch(`${baseUrl}/dogs`);
  if (!res.ok) {
    throw new Error("Cannot find dogs");
  }
  return (await res.json()) as Dog[];
};

export const Requests = {
  postDog,
  deleteDogRequest,
  patchFavoriteForDog,
  getAllDogs,
};
