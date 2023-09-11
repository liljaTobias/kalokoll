"use client";

import { Livsmedel } from "@/types/livsmedel";
import {
  FC,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

interface LivsmedelContext {
  livsmedel: Livsmedel[];
  addLivsmedel: (item: Livsmedel) => void;
}

const Context = createContext<LivsmedelContext | null>(null);

export const LivsmedelProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [livsmedel, setLivsmedel] = useState<Livsmedel[]>([]);

  const addLivsmedel = useCallback((item: Livsmedel) => {
    setLivsmedel((prev) => [...prev, item]);
  }, []);

  return (
    <Context.Provider value={{ livsmedel, addLivsmedel }}>
      {children}
    </Context.Provider>
  );
};

export const useLivsmedel = () => {
  const data = useContext(Context);

  if (data === null) {
    throw new Error("No provider in scope");
  }

  return {
    ...data,
  };
};
