import React, { useState, useEffect } from 'react';

const UsersFromJSONPlaceholder = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchAll();
  }, []);
  const fetchAll = () => {
    const fetchUsers = async () => {
      const data = await (
        await fetch('https://jsonplaceholder.typicode.com/users')
      ).json();
      setUsers(data);
    };
    fetchUsers();
  };
  const removeUser = (id) => {
    setUsers(users.filter((i) => i.id !== id));
  };
  const removeAll = () => {
    setUsers([]);
  };

  return (
    <div className='bg-green-200 p-4 w-4/5 m-auto'>
      <div className='bg-green-100 text-green-700 flex justify-between p-4'>
        <Button clickHandler={fetchAll} text='Get All' />
        <Button clickHandler={removeAll} text='Remove All' />
      </div>
      <div className='grid grid-cols-2 gap-4 mt-4'>
        {users.map(
          ({
            id,
            name,
            email,
            phone,
            website,
            company: { name: companyName },
          }) => {
            return (
              <div
                key={id}
                className='bg-green-100 rounded p-4 text-green-700 flex flex-col'
              >
                <h2 className='text-2xl font-bold'>{name}</h2>
                <p className='text-green-900 font-semibold'>
                  Company: {companyName}
                </p>
                <p> Email : {email}</p>
                <p>Phone: {phone}</p>
                <p>Website: {website}</p>
                <button
                  className='ml-auto p-2 border border-green-500 rounded mt-4 font-semibold'
                  onClick={() => removeUser(id)}
                >
                  Remove User
                </button>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

const Button = ({ clickHandler, text }) => {
  return (
    <button
      className='bg-green-200 p-2 rounded border-green-700 border'
      onClick={clickHandler}
    >
      {text}
    </button>
  );
};

export default UsersFromJSONPlaceholder;
