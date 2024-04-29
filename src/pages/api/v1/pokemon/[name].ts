import { PokemonStatsApi } from "@/core/interfaces/PokemonStatsApi";
import { PokemonMapper } from "@/core/mappers/PokemonMapper";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const name = (req.query.name as string).toLowerCase();

  const GET_POKEMON_BY_NAME = `${process.env.POKEAPI_URL}/pokemon/${name}`;

  try {
    console.log(`Fetching data to get pokemon ${name}`);
    const response = await fetch(GET_POKEMON_BY_NAME);
    if (!response.ok) {
      const message = `Error getting pokemon ${name}`;
      console.error(message);
      throw new Error(message);
    }

    console.log(`Successfully got pokemon ${name}`);
    const data: PokemonStatsApi = await response.json();
    return res.status(200).json(PokemonMapper.toPokemonStatsResponse(data));
  } catch (error) {
    return res.status(404).json({ error });
  }
}
