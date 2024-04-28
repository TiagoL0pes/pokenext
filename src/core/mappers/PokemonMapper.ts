import { PokemonStatsApi } from "../interfaces/PokemonStatsApi";
import { PokemonStatsResponse } from "../interfaces/PokemonStatsResponse";
import { Capitalize } from "../utils/StringUtils";

export const PokemonMapper = {
  toPokemonStatsResponse: (pokemon: PokemonStatsApi): PokemonStatsResponse => {
    const id = `#${pokemon.id.toString().padStart(4, "0")}`;
    const name = Capitalize(pokemon.name);
    const sound = pokemon.cries.latest;
    const sprite = pokemon.sprites.other["official-artwork"].front_default;
    const types = pokemon.types.map((t) => Capitalize(t.type.name));
    const abilities = pokemon.abilities.map((a) => ({
      name: Capitalize(a.ability.name),
      isHidden: a.is_hidden,
    }));
    const stats = pokemon.stats.map((s) => ({
      name: Capitalize(s.stat.name),
      power: s.base_stat,
    }));

    return {
      id,
      name,
      types,
      abilities,
      sprite,
      stats,
      sound,
    };
  },
};
