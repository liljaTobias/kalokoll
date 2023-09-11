const fs = require("fs/promises");
const path = require("path");
const fastXML = require("fast-xml-parser");

interface Naringsvarde {
  Namn: string;
  Forkortning: string;
  Varde: string;
  Enhet: string;
  SenastAndrad: string;
}

interface Livsmedel {
  Nummer: number;
  Namn: string;
  ViktGram: number;
  Huvudgrupp: string;
  Naringsvarden: {
    Naringsvarde: Naringsvarde[];
  };
}

interface LivsmedelDatabas {
  LivsmedelDataset: {
    LivsmedelsLista: {
      Livsmedel: Livsmedel[];
    };
  };
}

const getData = async () => {
  const parser = new fastXML.XMLParser();
  const p = path.join(process.cwd(), "public");
  const xmlFile = await fs.readFile(p + "/naringsvarden.xml");
  const json = parser.parse(xmlFile) as LivsmedelDatabas;

  let newObj = {};
  json.LivsmedelDataset.LivsmedelsLista.Livsmedel.forEach((lm) => {
    const key = lm.Namn.toLowerCase();
    newObj = { ...newObj, [key]: lm };
  });

  const newDb = {
    livsmedel: newObj,
  };

  await fs.writeFile(
    path.join(process.cwd(), "public/livsmedel.json"),
    JSON.stringify(newDb)
  );
};

getData();
