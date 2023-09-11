"use client";

import { useFormik } from "formik";
import { useState } from "react";

import jsonData from "@/database-json/livsmedel.json";
import { Livsmedel } from "@/types/livsmedel";
import { useLivsmedel } from "@/hooks/livsmedelContext";

interface DBData {
  livsmedel: {
    [key: string]: Livsmedel;
  };
}

interface SearchForm {
  search: string;
}

export const IngredientsForm = () => {
  const { addLivsmedel } = useLivsmedel();

  const handleSubmit = async (values: SearchForm) => {
    const db = jsonData as DBData;
    const found = Object.entries(db.livsmedel)
      .filter(([key, value]) =>
        key.toLowerCase().includes(values.search.toLowerCase())
      )
      .map((fv) => fv[1]);

    addLivsmedel(found[0]);
  };

  const formik = useFormik<SearchForm>({
    initialValues: {
      search: "",
    },
    onSubmit: handleSubmit,
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <label className="font-extrabold" htmlFor="search">
          Livsmedel
        </label>
        <input
          id="search"
          type="text"
          name="search"
          value={formik.values.search}
          onChange={formik.handleChange}
        />
        <button type="submit">Sök</button>
      </form>
    </>
  );
};
