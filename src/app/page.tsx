"use client";

import Card from "@/core/components/Card";
import Loading from "@/core/components/Loading";
import NotFound from "@/core/components/NotFound";
import { PokemonStatsResponse } from "@/core/interfaces/PokemonStatsResponse";
import { useState } from "react";

export default function Home() {
  const [lastSearch, setLastSearch] = useState("");
  const [name, setName] = useState("");
  const [pokemon, setPokemon] = useState<PokemonStatsResponse | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleKeyPress = async (event) => {
    if (event.key === "Enter" && lastSearch !== name && name) {
      try {
        setLastSearch(name);
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/v1/pokemon/${name}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const pokemon = await response.json();

        setPokemon(pokemon);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <main className="grid place-items-center">
      <div className="w-full">
        <h1 className="text-center text-4xl font-bold">Welcome to PokeNext</h1>

        <input
          type="text"
          placeholder="Search"
          className="my-8 shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyPress}
          readOnly={loading}
        />
      </div>

      {!pokemon && !loading && !error ? (
        <p>
          Welcome to PokeNext, type Pokemon's name or ID and click to search
        </p>
      ) : null}

      {error && !loading ? <NotFound /> : null}

      {loading ? <Loading /> : null}

      {pokemon && !error && !loading ? <Card pokemon={pokemon} /> : null}
    </main>
  );
}
