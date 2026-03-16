import { useState } from "react";
import { DarkContext } from "./DarkContext";

export const DarkProvider = ({ children }) => {

  const [darkMode, setDarkMode] = useState(false);

  const toggleDark = () => {
    setDarkMode(!darkMode);
  };

  return (
    <DarkContext.Provider value={{ darkMode, toggleDark }}>
      {children}
    </DarkContext.Provider>
  );
};