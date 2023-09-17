import { LivsmedelItem } from "@/hooks/livsmedelContext";

export const replaceAndKeepIndex = (
  arr: Array<LivsmedelItem>,
  newValue: LivsmedelItem
) => {
  const res = [...arr];
  const index = res.findIndex((item) => item.Nummer === newValue.Nummer);
  res.splice(index, 1, newValue);

  return res;
};
