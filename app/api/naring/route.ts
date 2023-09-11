import { readFile, writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";
import { xml2json } from "xml-js";

function read() {
  let data;
}

export async function GET() {
  const p = path.join(process.cwd(), "public");
  const xmlFile = (await readFile(p + "/naringsvarden.xml")).toString();
  console.log(p);
  const json = xml2json(xmlFile);

  await writeFile(p + "/naringsvärdenjson.json", json);

  const objects = JSON.parse(json);
  const results = [];
  const toSearch = "Granatäpple";

  for (var i = 0; i < objects.length; i++) {
    for (const key in objects[i]) {
      if (objects[i][key].indexOf(toSearch) != -1) {
        results.push(objects[i]);
      }
    }
  }

  return NextResponse.json({ results });
}
