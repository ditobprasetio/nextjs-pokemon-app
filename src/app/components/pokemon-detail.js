export default function PokemonDetail({ pokemon, error }) {
    if (error) {
        return (
            <>
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTven_CLuAGuia61DA5THVnB27mrATVhovInbpVntHrtgJPcxkZ7VQ3RB2pgrjwzaFZDVI&usqp=CAU"
                    alt="Error"
                    className="w-[800px] mx-auto"
                />
                <p className="font-medium text-lg">{error}</p>
            </>
        );
    }

    return (
        <>
            <div id="pokemon-detail" className="w-full mb-6">
                <div
                    id="pokemon-card"
                    className="h-[456px] bg-yellow-50 border-[10px] border-yellow-300 p-4 rounded-2xl shadow-xl"
                >
                    <div className="flex justify-between">
                        <h2 className="text-xl font-semibold capitalize">
                            {pokemon.species.name}
                        </h2>
                        <p className="text-xl font-bold">
                            <span className="text-xs mr-1">HP</span>{" "}
                            {pokemon.stats[0].base_stat}
                        </p>
                    </div>
                    <div className="mt-2 border-2 rounded-t-lg py-6 px-12 flex justify-center items-center bg-slate-50">
                        <img
                            src={pokemon.sprites.front_default}
                            alt={pokemon.species.name}
                        />
                    </div>
                    <div className="mb-2 border-2 py-1 rounded-b-lg flex justify-center bg-slate-200">
                        <p className="text-xs font-light">
                            Height: {pokemon.height}
                            {"'"}, Weight: {pokemon.weight} lbs
                        </p>
                    </div>
                    <div id="types" className="flex mb-4">
                        {pokemon.types.map((type) => (
                            <p
                                key={type.slot}
                                className="mr-1 py-1 px-3 bg-gray-300 rounded-full text-xs font-medium"
                            >
                                {type.type.name}
                            </p>
                        ))}
                    </div>
                    <div id="abilities" className="h-1/3 text-left py-2">
                        {pokemon.abilities.map((ability) => (
                            <p
                                key={ability.slot}
                                className="font-medium text-2xl my-2"
                            >
                                {ability.ability.name}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
