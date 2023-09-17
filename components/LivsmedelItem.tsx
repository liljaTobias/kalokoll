import { useLivsmedel } from "@/hooks/livsmedelContext";
import { ChangeEvent, FC, useCallback, useState } from "react";

interface LivsmedelItemProps {
  livsmedel: Livsmedel;
}

const NUTRITION_CATEGORIES = ["Energi (kcal)"];

export const LivsmedelItem: FC<LivsmedelItemProps> = ({ livsmedel }) => {
  const [weight, setWeight] = useState(100);

  const { updateQuantity } = useLivsmedel();

  const getNutrition = useCallback((nutrition: Naringsvarde[]) => {
    return nutrition
      .filter((nut) => NUTRITION_CATEGORIES.includes(nut.Namn))
      .map((nut) => (
        <li key={nut.Forkortning}>
          - {nut.Namn} : {nut.Varde} kcal / 100g
        </li>
      ));
  }, []);

  const handleWeightChange = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => {
      const value = ev.target.value;
      if (value === "") return;
      setWeight(parseInt(value));
      updateQuantity(livsmedel, parseInt(value));
    },
    [livsmedel, updateQuantity]
  );

  return (
    <li className="flex flex-row justify-between mb-2">
      <label>{livsmedel.Namn}</label>
      <div>
        <input type="text" value={weight} onChange={handleWeightChange} />
      </div>
    </li>
  );
};
