"use client";

import Image from "next/image";
import PokemonDetail from "./components/pokemon-detail";
import { useEffect, useState } from "react";

async function getPokemons() {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_POKEMON_API_URL}?limit=30&offset=30`
    );

    if (!res.ok) {
        throw new Error("Failed to fetch all pokemon data");
    }

    const pokemons = await res.json();

    return pokemons;
}

async function getPokemon(url) {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error("Failed to fetch pokemon data");
    }

    const pokemon = await res.json();

    return pokemon;
}

async function searchPokemonByName(name) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_POKEMON_API_URL}/${name.toLowerCase()}`
    );

    if (!res.ok) {
        throw new Error("Pokemon not found");
    }

    const pokemon = await res.json();

    return pokemon;
}

export default function Home() {
    const [pokemons, setPokemons] = useState(null);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [searchQuery, setSearchQuery] = useState(""); // New state for search input
    const [error, setError] = useState(""); // State for error handling

    useEffect(() => {
        const fetchPokemons = async () => {
            const fetchedPokemons = await getPokemons();
            setPokemons(fetchedPokemons);
        };

        fetchPokemons();
    }, []);

    const handlePokemonClick = async (url) => {
        const pokemon = await getPokemon(url);
        setSelectedPokemon(pokemon);
    };

    const handleSearchSubmit = async (event) => {
        event.preventDefault();
        setError(""); // Clear previous error
        setSelectedPokemon(null); // Clear previous selected Pokemon

        try {
            const pokemon = await searchPokemonByName(searchQuery);
            setSelectedPokemon(pokemon);
        } catch (error) {
            setError("Pokemon not found. Please try another name.");
        }
    };

    return (
        <>
            <div>
                <img
                    src="https://static.vecteezy.com/system/resources/thumbnails/027/127/591/small_2x/pokemon-logo-pokemon-icon-transparent-free-png.png"
                    alt="pokemon-logo"
                    className="max-w-[200px] mx-auto"
                />
            </div>

            <div className="container mx-auto p-4 max-w-screen-lg flex align-top">
                <div className="w-2/3">
                    <form className="w-full" onSubmit={handleSearchSubmit}>
                        <input
                            type="text"
                            name="q"
                            placeholder="Your Pokemon champ's name goes here!"
                            className="w-3/4 py-2 px-6 rounded-full bg-slate-50 mr-2"
                            onChange={(e) => setSearchQuery(e.target.value)}
                            value={searchQuery}
                        />
                        <input
                            type="submit"
                            value="Search"
                            className="py-2 px-6 bg-blue-700 text-white rounded-full"
                        />
                    </form>

                    <div className="mt-12">
                        <h2 className="text-xl font-semibold">Suggestions:</h2>
                        {pokemons?.results?.map((pokemon) => (
                            <button
                                key={pokemon.name}
                                className="py-2 px-6 m-2 outline-dashed outline-2 outline-blue-800 rounded-full bg-yellow-400 capitalize"
                                onClick={() => handlePokemonClick(pokemon.url)}
                            >
                                {pokemon.name}
                            </button>
                        ))}
                    </div>
                </div>
                <div
                    id="pokemon-section"
                    className="w-1/3 min-h-96 px-4 text-center flex justify-center items-center"
                >
                    {selectedPokemon ? (
                        <PokemonDetail
                            pokemon={selectedPokemon}
                            error={error}
                        />
                    ) : (
                        <p className="font-medium text-lg">
                            Dive in and scout out your beloved Pokemon!
                        </p>
                    )}
                </div>
            </div>
        </>
    );
}
