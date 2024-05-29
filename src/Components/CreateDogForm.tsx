import { useState } from "react";
import { dogPictures } from "../dog-pictures";
import { useDogContext } from "../hooks/api";

const defaultImage = dogPictures.BlueHeeler;
export const CreateDogForm = () => {
  const [inputs, setInput] = useState({
    image: defaultImage,
    name: "",
    description: "",
  });

  const { name, description, image } = inputs;
  const { createDog } = useDogContext();

  const resetForm = () => {
    setInput({ name: "", description: "", image: defaultImage });
  };

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
    createDog({
      name: name,
      image: image,
      description: description,
      isFavorite: false,
    }).catch((err) => console.log(err));

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
        disabled={false}
        onChange={handleInput}
      />
      <label htmlFor="description">Dog Description</label>
      <textarea
        value={description}
        name="description"
        cols={80}
        rows={10}
        disabled={false}
        onChange={handleInput}
      ></textarea>
      <label htmlFor="picture">Select an Image</label>
      <select disabled={false} name="image" id="image" onChange={handleInput}>
        {Object.entries(dogPictures).map(([label, pictureValue]) => {
          return (
            <option value={pictureValue} key={pictureValue}>
              {label}
            </option>
          );
        })}
      </select>
      <input type="submit" disabled={false} />
    </form>
  );
};
