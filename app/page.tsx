"use client";

import { LivsmedelList } from "@/components/LivsmedelList";
import { SearchField } from "@/components/SearchField/SearchField";
import { LivsmedelProvider } from "@/hooks/livsmedelContext";

export default function Home() {
  return (
    <LivsmedelProvider>
      <div className="flex min-h-screen flex-col items-center p-24">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex flex-col">
          <div>
            <SearchField />
          </div>
        </div>
        <div className="bg-slate-100 border-2 border-cyan-600 w-96 my-6">
          <LivsmedelList />
        </div>
      </div>
    </LivsmedelProvider>
  );
}
