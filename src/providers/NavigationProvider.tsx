import { ReactNode, createContext, useState } from "react";
import { TActiveTab } from "../types";

type TNavigationContext = {
  currentView: TActiveTab;
  handleCurrentView: (tab: TActiveTab) => void;
};

export const NavigationContext = createContext<TNavigationContext>(
  {} as TNavigationContext
);

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const [currentView, setCurrentView] = useState<TActiveTab>("allDogs");

  const handleCurrentView = (tab: TActiveTab) => {
    setCurrentView(tab);
    if (currentView === tab) setCurrentView("allDogs");
  };

  return (
    <NavigationContext.Provider value={{ currentView, handleCurrentView }}>
      {children}
    </NavigationContext.Provider>
  );
};
