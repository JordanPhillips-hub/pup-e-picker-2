import { useState } from "react";
import { useDogContext } from "../hooks/api";
import { dogPictures } from "../dog-pictures";

const defaultImage = dogPictures.BlueHeeler;
export const CreateDogForm = () => {
  const [inputs, setInput] = useState({
    image: defaultImage,
    name: "",
    description: "",
  });

  const { isLoading, createDog } = useDogContext();
  const { name, description, image } = inputs;

  const resetForm = () =>
    setInput({ name: "", description: "", image: defaultImage });

  const handleInput = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setInput((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createDog(
      {
        name: name,
        image: image,
        description: description,
        isFavorite: false,
      },
      name
    ).catch((err) => console.error("Error creating dog", err));
    resetForm();
  };

  return (
    <form action="" id="create-dog-form" onSubmit={handleSubmit}>
      <h4>Create a New Dog</h4>
      <label htmlFor="name">Dog Name</label>
      <input
        value={name}
        name="name"
        type="text"
        disabled={isLoading}
        onChange={handleInput}
      />
      <label htmlFor="description">Dog Description</label>
      <textarea
        value={description}
        name="description"
        cols={80}
        rows={10}
        disabled={isLoading}
        onChange={handleInput}
      ></textarea>
      <label htmlFor="picture">Select an Image</label>
      <select
        disabled={isLoading}
        name="image"
        id="image"
        onChange={handleInput}
      >
        {Object.entries(dogPictures).map(([label, pictureValue]) => {
          return (
            <option value={pictureValue} key={pictureValue}>
              {label}
            </option>
          );
        })}
      </select>
      <input type="submit" disabled={isLoading} />
    </form>
  );
};
