"use client";

import { IngredientsForm } from "@/components/IngredientsForm";
import { LivsmedelList } from "@/components/LivsmedelList";
import { LivsmedelProvider } from "@/hooks/livsmedelContext";

export default function Home() {
  return (
    <LivsmedelProvider>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex flex-col">
          <div>
            <IngredientsForm />
          </div>
          <div className="bg-slate-100 border-2 border-cyan-600 w-96 my-6">
            <LivsmedelList />
          </div>
        </div>
      </main>
    </LivsmedelProvider>
  );
}
