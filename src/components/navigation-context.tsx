import React, { createContext, useState, useContext } from "react";

interface NavigationContextProps {
  isNavigationOpen: boolean;
  toggleNavigation: () => void;
}

const NavigationContext = createContext<NavigationContextProps | undefined>(
  undefined
);

export const useNavigationContext = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error(
      "useNavigationContext must be used within a NavigationProvider"
    );
  }
  return context;
};

export const NavigationProvider: React.FC = ({ children }) => {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);

  const toggleNavigation = () => {
    setIsNavigationOpen(!isNavigationOpen);
  };

  return (
    <NavigationContext.Provider value={{ isNavigationOpen, toggleNavigation }}>
      {children}
    </NavigationContext.Provider>
  );
};
