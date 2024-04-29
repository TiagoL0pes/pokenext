import Image from "next/image";
import { PokemonStatsResponse } from "../../interfaces/PokemonStatsResponse";

interface CardProps {
  pokemon: PokemonStatsResponse;
}

export default function Card({ pokemon }: CardProps) {
  return (
    <div className="w-[360px] md:w-[400px]">
      <Image
        src={pokemon?.sprite as string}
        alt={pokemon?.name}
        width={300}
        height={300}
        className="mx-auto"
      />

      <div
        style={{ backgroundColor: "var(--light)" }}
        className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      >
        <h2 className="mb-8 text-center font-bold">
          {pokemon?.id} - {pokemon?.name}
        </h2>

        <hr className="border-t border-gray-300 my-6" />

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

        <hr className="border-t border-gray-300 my-6" />

        <div className="mt-4">
          {pokemon?.stats?.map((stat, index) => (
            <div
              key={index}
              className="flex justify-between items-center gap-4 mb-2"
            >
              <p className="w-28 font-bold">{stat.name}</p>
              <span className={"w-full h-4 bg-gray-200"}></span>
              <p className="w-10">{stat.power}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
