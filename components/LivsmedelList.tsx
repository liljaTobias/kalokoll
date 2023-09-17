import { useLivsmedel } from "@/hooks/livsmedelContext";
import { Naringsvarde } from "@/types/livsmedel";
import { useCallback, useMemo } from "react";
import { LivsmedelItem } from "./LivsmedelItem";

const NUTRITION_CATEGORIES = ["Energi (kcal)"];

export const LivsmedelList = () => {
  const { livsmedel } = useLivsmedel();

  const getNutrition = useCallback((nutrition: Naringsvarde[]) => {
    return nutrition
      .filter((nut) => NUTRITION_CATEGORIES.includes(nut.Namn))
      .map((nut) => (
        <li key={nut.Forkortning}>
          - {nut.Namn} : {nut.Varde} kcal / 100g
        </li>
      ));
  }, []);

  const kcalTotal: number = useMemo(() => {
    let total = 0;
    livsmedel.forEach((lm) => {
      const kcal = lm.Naringsvarden.Naringsvarde.filter(
        (nut) => NUTRITION_CATEGORIES[0] === nut.Namn
      )[0].Varde.split(" ")[0];
      total += parseInt(kcal) * (lm.quantity / 100); // TODO: Hardcoded for 100gram default for now
    });
    return total;
  }, [livsmedel]);

  console.log(livsmedel);

  return (
    <ul>
      {livsmedel?.map((lm) => (
        <LivsmedelItem key={lm.Nummer} livsmedel={lm} />
        // <li key={lm.Nummer}>
        //   {lm.Namn}
        //   <ul>{getNutrition(lm.Naringsvarden.Naringsvarde)}</ul>
        //   <hr />
        // </li>
      ))}
      <li>
        <b>Total kcal:</b> {kcalTotal}
      </li>
    </ul>
  );
};
