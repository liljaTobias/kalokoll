"use client";

import { Livsmedel } from "@/types/livsmedel";
import { replaceAndKeepIndex } from "@/utils/arrayHelpers";
import {
  FC,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

enum QuantityType {
  Gram = "gram",
  DL = "deciliter",
  ST = "piece",
}

export interface LivsmedelItem extends Livsmedel {
  quantity: number;
  quantityType: QuantityType;
}

interface LivsmedelContext {
  livsmedel: LivsmedelItem[];
  addLivsmedel: (item: Livsmedel) => void;
  updateQuantity: (
    item: Livsmedel,
    newQuantity: number,
    newQuantityType?: QuantityType
  ) => void;
}

const Context = createContext<LivsmedelContext | null>(null);

export const LivsmedelProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [livsmedel, setLivsmedel] = useState<LivsmedelItem[]>([]);

  const addLivsmedel = useCallback((item: Livsmedel) => {
    // Default to quantity in grams since that's what the database has
    const lvWithQuantity: LivsmedelItem = {
      ...item,
      quantity: item.ViktGram,
      quantityType: QuantityType.Gram,
    };
    setLivsmedel((prev) => [...prev, lvWithQuantity]);
  }, []);

  const updateQuantity = useCallback(
    (
      item: Livsmedel,
      newQuantity: number,
      newQuantityType = QuantityType.Gram
    ) => {
      const updatedLivsmedel = replaceAndKeepIndex(livsmedel, {
        ...item,
        quantity: newQuantity,
        quantityType: newQuantityType,
      });
      setLivsmedel(updatedLivsmedel);
    },
    [livsmedel]
  );

  return (
    <Context.Provider value={{ livsmedel, addLivsmedel, updateQuantity }}>
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
