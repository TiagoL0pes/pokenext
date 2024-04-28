"use client";

import { PokemonStatsResponse } from "@/core/interfaces/pokemon-stats-response";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [lastSearch, setLastSearch] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [pokemon, setPokemon] = useState<PokemonStatsResponse | undefined>(
    undefined
  );

  const handleKeyPress = async (event) => {
    if (event.key === "Enter" && lastSearch !== name && name) {
      const response = await fetch(`/api/v1/pokemon/${name}`);
      const pokemon = await response.json();
      setPokemon(pokemon);
      setLastSearch(name);
    }
  };

  return (
    <main className="grid place-items-center">
      <div className="w-full md:w-1/4">
        <h1 className="text-center font-bold">Welcome to PokeNext</h1>

        <input
          type="text"
          placeholder="Search"
          className="mt-8 mb-48 shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyPress}
        />
      </div>

      {pokemon ? (
        <div className="w-[400px]">
          <div className="relative">
            <Image
              src={pokemon?.sprite as string}
              alt="pokemon"
              width={300}
              height={300}
              className="absolute -translate-y-[50%] translate-x-1/4"
            />
          </div>

          <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h2 className="mt-32 mb-8 text-center font-bold">
              {pokemon?.id} - {pokemon?.name}
            </h2>
            <div className="flex justify-between gap-16">
              <div>
                <p className="font-bold">
                  {pokemon?.types.length === 1 ? "Type" : "Types"}
                </p>
                {pokemon?.types.map((type, index) => (
                  <p key={index}>{type}</p>
                ))}
              </div>
              <div className="flex-grow">
                <div className="flex justify-between">
                  <div>
                    <p className="font-bold">Ability</p>
                    <p>{pokemon?.abilities.find((a) => !a.isHidden)?.name}</p>
                  </div>
                  <div>
                    <p className="font-bold">Hidden Ability</p>
                    <p>{pokemon?.abilities.find((a) => a.isHidden)?.name}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-grow mt-8">
              <div className="flex justify-between">
                {pokemon?.stats.map((stat, index) => (
                  <div key={index}>
                    <p className="font-bold">{stat.name}</p>
                    <p>{stat.power}</p>
                  </div>
                ))}
                {/* <div>
                <p className="font-bold">HP</p>
                <p>35</p>
              </div>
              <div>
                <p className="font-bold">Attack</p>
                <p>55</p>
              </div>
              <div>
                <p className="font-bold">Defense</p>
                <p>40</p>
              </div> */}
              </div>

              {/* <div className="flex justify-between mt-4">
              <div>
                <p className="font-bold">Special Attack</p>
                <p>50</p>
              </div>
              <div>
                <p className="font-bold">Special Defense</p>
                <p>50</p>
              </div>
              <div>
                <p className="font-bold">Speed</p>
                <p>90</p>
              </div>
            </div> */}
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
