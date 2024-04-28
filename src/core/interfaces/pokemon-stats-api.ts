export interface PokemonStatsApi {
  abilities: Ability[];
  cries: Cries;
  forms: Resource[];
  id: number;
  name: string;
  sprites: Sprites;
  stats: Stat[];
  types: Type[];
}

interface Ability {
  ability: Resource;
  is_hidden: boolean;
}

interface Cries {
  latest: string;
}

interface Sprites {
  other: Other;
}

interface Other {
  "official-artwork": Officialartwork;
}

interface Officialartwork {
  front_default: string;
}

interface Stat {
  base_stat: number;
  stat: Resource;
}

interface Type {
  slot: number;
  type: Resource;
}

interface Resource {
  name: string;
  url: string;
}
