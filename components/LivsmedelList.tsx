import { useLivsmedel } from "@/hooks/livsmedelContext";
import { Naringsvarde } from "@/types/livsmedel";
import { useCallback } from "react";

export const LivsmedelList = () => {
  const { livsmedel } = useLivsmedel();

  const getNutrition = useCallback((nutrition: Naringsvarde[]) => {
    const NUTRITION_CATEGORIES = ["Energi (kcal)"];

    return nutrition
      .filter((nut) => NUTRITION_CATEGORIES.includes(nut.Namn))
      .map((nut) => (
        <li key={nut.Forkortning}>
          - {nut.Namn} : {nut.Varde} kcal / 100g
        </li>
      ));
  }, []);

  return (
    <ul>
      {livsmedel?.map((lm) => (
        <li key={lm.Nummer}>
          {lm.Namn}
          <ul>{getNutrition(lm.Naringsvarden.Naringsvarde)}</ul>
          <hr />
        </li>
      ))}
    </ul>
  );
};
