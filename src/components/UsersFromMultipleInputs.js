import React, { useState } from 'react';

const UsersFromMultipleInputs = () => {
  const [person, setPerson] = useState({
    firstName: '',
    email: '',
    age: '',
    country: '',
  });

  const [people, setPeople] = useState([
    { firstName: 'Ava', email: 'ava@mail.com', age: 21, country: 'USA', id: 1 },
    {
      firstName: 'Nicole',
      email: 'nicole@mail.com',
      age: 23,
      country: 'Canada',
      id: 2,
    },
  ]);

  const handleChange = (e) => {
    setPerson({ ...person, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (person.firstName && person.email && person.age && person.country) {
      setPeople([...people, { ...person, id: Date.now() }]);
      setPerson({ firstName: '', email: '', age: '', country: '' });
    }
  };
  return (
    <div className='w-11/12 mx-auto my-4 p-4 bg-gradient-to-br from-gray-200 to-gray-400'>
      <h1 className='text-center italic font-thin text-4xl mb-4'>
        Users From Inputs
      </h1>
      <form
        onSubmit={handleSubmit}
        className='bg-gradient-to-br from-teal-200 to-blue-200 shadow rounded p-4 text-blue-800 flex flex-col gap-4 shadow'
      >
        <Input
          title='firstName'
          value={person.firstName}
          label='Name'
          handleChange={handleChange}
        />
        <Input
          title='email'
          value={person.email}
          label='Email'
          handleChange={handleChange}
        />
        <Input
          title='age'
          value={person.age}
          label='Age'
          handleChange={handleChange}
        />
        <Input
          title='country'
          value={person.country}
          label='Country'
          handleChange={handleChange}
        />
        <button className='bg-gray-400 rounded w-4/5 mx-auto p-2' type='submit'>
          Add User
        </button>
      </form>
      <div className='bg-gradient-to-br from-teal-200 to-blue-200 rounded shadow mt-4 grid grid-cols-3 gap-4 p-4'>
        {people.map((person) => {
          const { id, firstName, email, age, country } = person;
          return (
            <div key={id} className='bg-gray-200 rounded p-2'>
              <h2>{firstName}</h2>
              <h3>Age: {age}</h3>
              <h3>Country: {country}</h3>
              <h4>{email}</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Input = ({ title, value, handleChange, label }) => {
  return (
    <div className='w-4/5 bg-gray-300 rounded p-4 flex justify-between mx-auto'>
      <label htmlFor={title}>{label} : </label>
      <input
        type='text'
        name={title}
        id={title}
        value={value}
        onChange={handleChange}
        className='bg-gray-200 rounded px-2 py-1 w-4/5'
      />
    </div>
  );
};

export default UsersFromMultipleInputs;
