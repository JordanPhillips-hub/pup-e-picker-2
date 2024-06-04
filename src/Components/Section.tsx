import { ReactNode } from "react";
import { useDogContext, useNavigationContext } from "../hooks/api.hooks";
import { TActiveTab } from "../types";

export const Section = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => {
  const { favoritedDogs, unfavoritedDogs } = useDogContext();
  const { currentView, handleCurrentView } = useNavigationContext();

  const navigationTabs: { name: TActiveTab; counter?: string }[] = [
    { name: "favorited", counter: `(${favoritedDogs.length})` },
    { name: "unfavorited", counter: `(${unfavoritedDogs.length})` },
    { name: "create dog" },
  ];

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
