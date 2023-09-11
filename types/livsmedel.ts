export interface Naringsvarde {
  Namn: string;
  Forkortning: string;
  Varde: string;
  Enhet: string;
  SenastAndrad: string;
}

export interface Livsmedel {
  Nummer: number;
  Namn: string;
  ViktGram: number;
  Huvudgrupp: string;
  Naringsvarden: {
    Naringsvarde: Naringsvarde[];
  };
}

export interface LivsmedelDatabas {
  LivsmedelDataset: {
    LivsmedelsLista: {
      Livsmedel: Livsmedel[];
    };
  };
}
