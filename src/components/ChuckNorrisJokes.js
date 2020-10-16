import React, { useState, useEffect, useCallback } from 'react';

const RANDOM_JOKE_URL = 'https://api.chucknorris.io/jokes/random';
const CATEGORIES_URL = 'https://api.chucknorris.io/jokes/categories';
const CATEGORIES_JOKE_URL = 'https://api.chucknorris.io/jokes/random?category=';

const ChuckNorrisJokes = () => {
  const [buttons, setButtons] = useState([]);
  const [joke, setJoke] = useState('');
  const fetchData = (url) => {
    return fetch(url).then((res) => res.json());
  };
  const dispalyJoke = useCallback((url) => {
    fetchData(url).then((data) => setJoke(data));
  }, []);
  useEffect(() => {
    fetchData(CATEGORIES_URL).then((data) => setButtons(data));
    dispalyJoke(RANDOM_JOKE_URL);
  }, [dispalyJoke]);

  return (
    <div className='absolute w-full h-full flex items-center justify-center'>
      <div className=' p-4 w-4/5 bg-gray-400 min-h-4/5 flex justify-between flex-col rounded'>
        <h1 className='text-center text-3xl mt-4'>
          <span role='img' aria-label='smile emoji'>
            🤣
          </span>{' '}
          Chuck Norris Joke Generator{' '}
          <span role='img' aria-label='smile emoji'>
            🤣
          </span>
        </h1>
        <div className='text-center font-bold text-4xl mb-8'>{joke.value}</div>
        <div>
          <h4 className='text-3xl text-center mb-4'>Chose joke category</h4>
          <div className='flex flex-wrap justify-center gap-4'>
            {buttons.map((btn, idx) => {
              return (
                <button
                  className='rounded px-2 py-1 bg-teal-400 text-lg uppercase'
                  onClick={() => dispalyJoke(CATEGORIES_JOKE_URL + btn)}
                  key={idx}
                >
                  {btn}
                </button>
              );
            })}
            <button
              className='rounded px-2 py-1 bg-teal-400 text-lg uppercase'
              onClick={() => dispalyJoke(RANDOM_JOKE_URL)}
            >
              random
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChuckNorrisJokes;
