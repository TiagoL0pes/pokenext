export interface PokemonStatsResponse {
  id: number;
  name: string;
  types: string[];
  abilities: Ability[];
  sprite: string;
  stats: Stat[];
  sound: string;
}

interface Ability {
  name: string;
  isHidden: boolean;
}

interface Stat {
  name: string;
  power: number;
}
