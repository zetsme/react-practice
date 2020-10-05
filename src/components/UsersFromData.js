import React, { useState } from 'react';

const data = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Mike' },
  { id: 3, name: 'Alexis' },
  { id: 4, name: 'Jada' },
  { id: 5, name: 'Elsa' },
];

const UsersFromData = () => {
  const [people, setPeople] = useState(data);
  const removePeople = (id) => {
    setPeople(people.filter((i) => i.id !== id));
  };
  return (
    <div className='grid grid-cols-3 gap-4 bg-pink-200 m-4 p-2'>
      <button
        className='text-green-500 border-green-500 border-2 text-4xl'
        onClick={() => setPeople(data)}
      >
        Add everyone
      </button>
      {people.map(({ id, name }) => (
        <div
          key={id}
          className='flex justify-between border border-pink-900 p-4'
        >
          <h4 className='text-pink-900 text-2xl'>{name}</h4>
          <button
            onClick={() => removePeople(id)}
            className='text-pink-500 rounded border border-pink-500 p-2'
          >
            Remove User
          </button>
        </div>
      ))}
      <button
        onClick={() => setPeople([])}
        className='text-red-700 border-2 border-red-500 text-4xl'
      >
        Clear All
      </button>
    </div>
  );
};

export default UsersFromData;
