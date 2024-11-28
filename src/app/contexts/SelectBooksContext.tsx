"use client"

import React, { createContext, useContext, useState } from 'react';
import { DbType } from '../database.types';

interface SelectBooksItem {
  id: number;
  titulo: string;
  editora: string;
  valor: number;
}

interface SelectBooksContextType {
  items: DbType[];
  addItem: (item: DbType) => void;
  removeItem: (id: number) => void;
}

const SelectBooksContext = createContext<SelectBooksContextType | undefined>(undefined);

export const SelectBooksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<DbType[]>([]);

  const addItem = (item: DbType) => {
    setItems((prevItems) => [...prevItems, item]);
  };

  const removeItem = (id: number) => {
    setItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  return (
    <SelectBooksContext.Provider value={{ items, addItem, removeItem }}>
      {children}
    </SelectBooksContext.Provider>
  );
};

export const useSelectBooks = () => {
  const context = useContext(SelectBooksContext);
  if (!context) {
    throw new Error('useSelectBooks must be used within a SelectBooksProvider');
  }
  return context;
};