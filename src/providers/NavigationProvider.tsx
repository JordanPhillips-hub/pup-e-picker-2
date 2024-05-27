import { ReactNode, createContext, useContext, useState } from "react";
import { TActiveTab } from "../types";

type TNavigationContext = {
  currentView: TActiveTab;
  setCurrentView: React.Dispatch<React.SetStateAction<TActiveTab>>;
};

const NavigationContext = createContext<TNavigationContext>(
  {} as TNavigationContext
);

export const useNavigationContext = () => useContext(NavigationContext);
export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const [currentView, setCurrentView] = useState<TActiveTab>("allDogs");
  return (
    <NavigationContext.Provider value={{ currentView, setCurrentView }}>
      {children}
    </NavigationContext.Provider>
  );
};
