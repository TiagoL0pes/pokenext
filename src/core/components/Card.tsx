import Image from "next/image";
import { PokemonStatsResponse } from "../interfaces/PokemonStatsResponse";

interface CardProps {
  pokemon: PokemonStatsResponse;
}

export default function Card({ pokemon }: CardProps) {
  return (
    <div className="w-[360px] md:w-[400px]">
      <div className="relative">
        <Image
          src={pokemon?.sprite as string}
          alt={pokemon?.name}
          width={300}
          height={300}
          className="absolute -translate-y-[50%] translate-x-1/4 md:translate-x-1/2"
        />
      </div>

      <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h2 className="mt-32 mb-8 text-center font-bold">
          {pokemon?.id} - {pokemon?.name}
        </h2>
        <div className="flex justify-between gap-16">
          <div>
            <p className="font-bold">
              {pokemon?.types?.length === 1 ? "Type" : "Types"}
            </p>
            {pokemon?.types?.map((type, index) => (
              <p key={index}>{type}</p>
            ))}
          </div>
          <div className="flex-grow">
            <div className="flex justify-between">
              <div>
                <p className="font-bold">Ability</p>
                <p>{pokemon?.abilities?.find((a) => !a.isHidden)?.name}</p>
              </div>
              <div>
                <p className="font-bold">Hidden Ability</p>
                <p>{pokemon?.abilities?.find((a) => a.isHidden)?.name}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-grow mt-8">
          <div className="flex justify-between">
            {pokemon?.stats?.map((stat, index) => (
              <div key={index}>
                <p className="font-bold">{stat.name}</p>
                <p>{stat.power}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
