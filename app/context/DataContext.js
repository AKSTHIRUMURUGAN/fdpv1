"use client"
import React, { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [data, setData] = useState([]); // Modify as per your data structure

  return (
    <DataContext.Provider value={{ events, setEvents, data, setData }}>
      {children}
    </DataContext.Provider>
  );
};
