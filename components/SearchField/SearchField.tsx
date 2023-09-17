import {
  ChangeEvent,
  FC,
  KeyboardEvent,
  useCallback,
  useMemo,
  useState,
} from "react";

import jsonData from "@/database-json/livsmedel.json";
import { useLivsmedel } from "@/hooks/livsmedelContext";

interface DBData {
  livsmedel: {
    [key: string]: Livsmedel;
  };
}

export const SearchField: FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<number>(0);

  const { addLivsmedel } = useLivsmedel();

  const handleSearch = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as string;

    setSearchTerm(value);
  }, []);

  const handleClickSelect = useCallback(
    (lv: Livsmedel) => {
      console.log("Saving!", lv);
      addLivsmedel(lv);
    },
    [addLivsmedel]
  );

  const results = useMemo(() => {
    if (searchTerm === undefined || searchTerm.length < 3) return [];

    const db = jsonData as DBData;
    const foundItems = Object.entries(db.livsmedel)
      .filter(([key, value]) =>
        key.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .map((fv) => fv[1]);

    return foundItems;
  }, [searchTerm]);

  const handleEnterSelect = useCallback(() => {
    const lv = results[selectedItem];
    addLivsmedel(lv);
  }, [selectedItem, results, addLivsmedel]);

  const handleKeyEvents = useCallback(
    (ev: KeyboardEvent<HTMLInputElement>) => {
      const { key } = ev;
      switch (key) {
        case "Escape":
          setSearchTerm("");
          break;

        case "ArrowUp":
          if (selectedItem === 0) return;
          setSelectedItem((prev) => prev - 1);
          break;

        case "ArrowDown":
          if (selectedItem === results.length) return;
          setSelectedItem((prev) => prev + 1);
          break;

        case "Enter":
          handleEnterSelect();
          setSearchTerm("");
          break;
      }
    },
    [results, selectedItem, handleEnterSelect]
  );

  const getBoldSubstring = (name: string, searchTerm: string) => {
    return name.replaceAll(searchTerm, "<b>" + searchTerm + "</b>");
  };

  return (
    <div className="flex flex-col items-stretch justify-between w-80 relative">
      <div className="flex flex-row items-center justify-between text-2xl gap-1">
        <input
          value={searchTerm}
          onChange={handleSearch}
          type="search"
          className="h-14 grow border-4 border-black"
          onKeyUp={handleKeyEvents}
        />
        <button
          type="submit"
          className="border-4 border-black h-14 w-20 bg-cyan-200 flex-none"
        >
          Sök
        </button>
      </div>
      <div className="z-50 bg-slate-100  self-center top-[calc(100%)] w-full absolute">
        {results.map((result, index) => (
          <div
            key={result.Nummer}
            onClick={() => handleClickSelect(result)}
            className={`${index === selectedItem && "bg-slate-400"}`}
          >
            <label
              dangerouslySetInnerHTML={{
                __html: getBoldSubstring(result.Namn, searchTerm),
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
