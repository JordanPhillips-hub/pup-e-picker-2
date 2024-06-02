import { ReactNode } from "react";
import { useDogContext, useNavigationContext } from "../hooks/api";
import { TActiveTab } from "../types";

export const Section = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => {
  const { dogs } = useDogContext();
  const { currentView, setCurrentView } = useNavigationContext();

  const favoritedDogs = dogs.filter((dog) => dog.isFavorite);
  const unfavoritedDogs = dogs.filter((dog) => !dog.isFavorite);

  const navigationTabs = [
    { name: "favorited", counter: `(${favoritedDogs.length})` },
    { name: "unfavorited", counter: `(${unfavoritedDogs.length})` },
    { name: "create dog" },
  ];

  const handleCurrentView = (tab: string) => {
    setCurrentView(tab as TActiveTab);
    if (currentView === tab) setCurrentView("allDogs");
  };

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">{label}</div>
        <div className="selectors">
          {navigationTabs.map(({ name, counter }) => (
            <div
              key={name}
              className={`selector ${currentView === name ? "active" : ""}`}
              onClick={() => handleCurrentView(name)}
            >
              {name === "favorited" || name === "unfavorited"
                ? `${name} ${counter ?? ""}`
                : name}
            </div>
          ))}
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};
