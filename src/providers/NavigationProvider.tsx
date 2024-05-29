import { ReactNode, createContext, useState } from "react";
import { TActiveTab } from "../types";

type TNavigationContext = {
  currentView: TActiveTab;
  setCurrentView: React.Dispatch<React.SetStateAction<TActiveTab>>;
};

export const NavigationContext = createContext<TNavigationContext>(
  {} as TNavigationContext
);

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const [currentView, setCurrentView] = useState<TActiveTab>("allDogs");
  return (
    <NavigationContext.Provider value={{ currentView, setCurrentView }}>
      {children}
    </NavigationContext.Provider>
  );
};
