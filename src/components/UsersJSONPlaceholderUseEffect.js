import React, { useState, useEffect } from 'react';
const jsonRes = ['posts', 'todos', 'users'];

const UsersJSONPlaceholderUseEffect = () => {
  const fetchData = async (type) => {
    const resp = await fetch(`https://jsonplaceholder.typicode.com/${type}`);
    const data = await resp.json();
    setItems(data);
  };
  const [type, setType] = useState('users');
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetchData(type);
  }, [type]);
  return (
    <div>
      <div className='m-4'>
        {jsonRes.map((btn, id) => {
          return (
            <button
              className='px-2 py-1 border mx-1 rounded'
              key={id}
              onClick={() => setType(btn)}
            >
              {btn}
            </button>
          );
        })}
      </div>
      <div>
        <h1>{type.toUpperCase()}</h1>
        <pre>{JSON.stringify(items, null, 2)}</pre>
      </div>
    </div>
  );
};

export default UsersJSONPlaceholderUseEffect;
