import { PokemonStatsApi } from "@/core/interfaces/PokemonStatsApi";
import { PokemonMapper } from "@/core/mappers/PokemonMapper";
import CacheService from "@/services/CacheService";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const name = (req.query.name as string).toLowerCase();

  const cache = await getPokemonFromCache(name);
  if (!!cache) {
    return res.status(200).json(cache);
  }

  try {
    const { pokemon, error } = await getPokemonFromAPI(name);
    if (error) {
      throw new Error(error);
    }

    await setPokemonInCache(name, pokemon);

    return res.status(200).json(pokemon);
  } catch (error) {
    return res.status(404).json({ error });
  }
}

const getPokemonFromCache = async (name: string) => {
  console.log(`[LOG]: Getting ${name} from cache`);

  const cache = await CacheService.getCacheItem(name);
  if (!cache) {
    console.log(`[LOG]: Fail to get ${name} from cache`);
  } else {
    console.log(`[LOG]: Successfully got pokemon ${name} from cache`);
  }

  return cache;
};

const getPokemonFromAPI = async (name: string) => {
  console.log(`[LOG]: Fetching data to get pokemon ${name}`);

  const GET_POKEMON_BY_NAME = `${process.env.POKEAPI_URL}/pokemon/${name}`;

  const response = await fetch(GET_POKEMON_BY_NAME);
  if (!response.ok) {
    const error = `Error getting pokemon ${name}`;
    console.error(`[ERROR]: ${error}`);
    return { pokemon: null, error };
  }

  console.log(`[LOG]: Successfully got pokemon ${name}`);

  const data: PokemonStatsApi = await response.json();

  const pokemon = PokemonMapper.toPokemonStatsResponse(data);

  return { pokemon, error: null };
};

const setPokemonInCache = async (name: string, pokemon: any) => {
  console.log(`[LOG]: Storing ${name} in cache`);

  const result = await CacheService.setCacheItem(name, pokemon);
  if (!result) {
    console.log(`[LOG]: Fail to store ${name} in cache`);
  } else {
    console.log(`[LOG]: Successfully set pokemon ${name} in cache`);
  }
};
