import { PokemonStatsApi } from "@/core/interfaces/pokemon-stats-api";
import { PokemonMapper } from "@/core/mappers/pokemon.mapper";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const param = (req.query.name as string).toLowerCase();

  const GET_POKEMON_BY_NAME = `${process.env.POKEAPI_URL}/pokemon/${param}`;

  const response = await fetch(GET_POKEMON_BY_NAME);

  const data: PokemonStatsApi = await response.json();

  return res.status(200).json(PokemonMapper.toPokemonStatsResponse(data));
}
