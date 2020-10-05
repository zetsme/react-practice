import React, { useState } from 'react';

const UsersFromFormInputs = () => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [persons, setPersons] = useState([
    { firstName: 'Kira', email: 'test@email.com', id: 3123123 },
    { firstName: 'Calsey', email: 'calsey@email.com', id: 21312312312 },
  ]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (firstName && email) {
      setPersons([...persons, { firstName, email, id: Date.now() }]);
      setFirstName('');
      setEmail('');
    }
  };
  return (
    <div className='w-4/5 mx-auto my-4'>
      <h1 className='text-center text-4xl'>Form Inputs</h1>
      <form
        onSubmit={handleSubmit}
        className='bg-orange-200 p-4 rounded flex flex-col gap-4'
      >
        <div className='bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 p-4 rounded'>
          <label htmlFor='firstName'>Name : </label>
          <input
            className='px-2 py-1 rounded ml-4 w-4/5'
            id='firstName'
            name='firstName'
            type='text'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className='bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 p-4 rounded'>
          <label htmlFor='email'>Email : </label>
          <input
            className='px-2 py-1 rounded ml-4 w-4/5'
            id='email'
            name='email'
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button
          className='bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 rounded p-2'
          type='submit'
        >
          Add User
        </button>
      </form>
      <section className='mt-4 bg-orange-300 p-4 rounded flex flex-col gap-4'>
        {persons.map(({ firstName, email, id }) => (
          <article
            className='bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 rounded p-4 flex items-center justify-between'
            key={id}
          >
            <p>{firstName.toUpperCase()}</p>
            <p>{email}</p>
          </article>
        ))}
      </section>
    </div>
  );
};

export default UsersFromFormInputs;
