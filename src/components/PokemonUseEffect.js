import React, { useState, useEffect } from 'react';

const PokemonUseEffect = () => {
  return (
    <div>
      <PokemonForm />
    </div>
  );
};

const PokemonForm = () => {
  const [inputValue, setInputValue] = useState('farfetchd');
  const [pokemonToGet, setPokemonToGet] = useState('gastly');
  const getPokemon = () => {
    setPokemonToGet(inputValue.trim().toLocaleLowerCase());
    setInputValue('');
  };
  return (
    <div className='w-4/5 mx-auto mt-10 bg-teal-400 p-4'>
      <div className='flex justify-between items-center bg-orange-200 p-4'>
        <input
          className='rounded px-2 py-1'
          type='text'
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
        <button
          className='px-2 py-1 border border-orange-400 rounded'
          onClick={getPokemon}
        >
          Get Pokemon
        </button>
      </div>
      <Pokemon pokemonToGet={pokemonToGet} />
    </div>
  );
};

const Pokemon = ({ pokemonToGet }) => {
  const [pokemon, setPokemon] = useState(null);
  const fetchPokemon = async (pokemonToGet) => {
    const data = await (
      await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonToGet}`)
    ).json();
    setPokemon(data);
  };
  useEffect(() => {
    fetchPokemon(pokemonToGet);
  }, [pokemonToGet]);
  return (
    <section className='bg-orange-200 mt-4'>
      {pokemon ? (
        <article className='grid grid-rows-2 grid-cols-2 p-2 place-items-center'>
          <img
            className='row-span-2'
            src={pokemon.sprites.front_default}
            alt=''
          />
          <p>Name: {pokemon.name}</p>
          <p>Type: {pokemon.types.map((t) => t.type.name).join(' ,')}</p>
        </article>
      ) : (
        <p>'Lodaing ...'</p>
      )}
    </section>
  );
};

export default PokemonUseEffect;
