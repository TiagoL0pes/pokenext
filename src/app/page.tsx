"use client";

import Card from "@/components/Card";
import UserFeedback from "@/components/UserFeedback";
import { PokemonStatsResponse } from "@/core/interfaces/PokemonStatsResponse";
import { MagnifyingGlass } from "@phosphor-icons/react";
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
          const error = await response.json();
          throw new Error(error);
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

  const canShowWelcome = !pokemon && !loading && !error;
  const canShowNotFound = error && !loading;
  const canShowCard = pokemon && !loading && !error;

  return (
    <main className="grid place-items-center">
      <div className="w-full">
        <h1 className="text-center text-4xl font-bold title">
          Welcome to PokeNext
        </h1>

        <label className="relative block">
          <MagnifyingGlass className="text-gray-400 pointer-events-none w-8 h-8 absolute top-1/2 transform -translate-y-4 right-3" />
          <input
            type="text"
            placeholder="Search"
            className="my-8 shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight bg-gray-200"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyPress}
            readOnly={loading}
          />
        </label>
      </div>

      {canShowWelcome ? (
        <UserFeedback
          imgSrc="/welcome.png"
          imgAlt="welcome image"
          message="Welcome to PokeNext, type Pokemon's name or ID and click to search"
        />
      ) : null}

      {canShowNotFound ? (
        <UserFeedback
          imgSrc="/not-found.png"
          imgAlt="not found image"
          message="No result found, try again!"
        />
      ) : null}

      {loading ? (
        <UserFeedback
          imgSrc="/pokeball.png"
          imgAlt="loading image"
          message="Loading..."
          animation="infinite-spin"
        />
      ) : null}

      {canShowCard ? <Card pokemon={pokemon} /> : null}
    </main>
  );
}
