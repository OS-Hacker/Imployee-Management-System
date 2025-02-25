import React, { createContext, useState } from "react";

export const myContext = createContext();

const Context = ({ children }) => {

  const initialTheme = () => {
    return localStorage.getItem("theme")
      ? JSON.parse(localStorage.getItem("theme"))
      : false;
  };

  const [theme, setTheme] = useState(initialTheme);

  const toggleTheme = () => {
    setTheme((prev) => {
      const prveTheme = !prev;
      localStorage.setItem("theme", prveTheme);
      return prveTheme;
    });
  };

  return (
    <myContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </myContext.Provider>
  );
};

export default Context;
