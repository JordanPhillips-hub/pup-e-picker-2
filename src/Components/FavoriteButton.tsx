import { Icons } from "../icons";
import { Dog } from "../types";

// ! Do Not Change This Component
export const FavoriteButton = ({
  disabled,
  onClick,
}: {
  disabled: boolean;
  onClick: () => Promise<Dog>;
}) => (
  <img
    src={Icons.EmptyHeart}
    alt=""
    className="favorite-button"
    style={{
      width: 40,
      border: 0,
      cursor: disabled ? "no-drop" : "pointer",
    }}
    onClick={() => {
      if (!disabled) {
        void onClick();
      }
    }}
  />
);
