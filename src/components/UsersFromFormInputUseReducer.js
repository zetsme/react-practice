import React, { useEffect, useReducer, useRef, useState } from 'react';
const boxStyles = 'bg-blue-300 p-4 w-1/2 rounded';
const buttonStyles = 'px-2 py-1 bg-gray-700 text-white rounded';
const defaultState = {
  users: [],
  modalContent: '',
  modalIsOpen: false,
};
const reducer = (state, action) => {
  switch (action.type) {
    case 'EMPTY_VALUE':
      return {
        ...state,
        modalContent: 'Enter Your Name',
        modalIsOpen: true,
      };
    case 'ADD_USER':
      return {
        ...state,
        users: [...state.users, action.user],
        modalContent: action.user.name,
        modalIsOpen: true,
      };
    case 'REMOVE_USER':
      return {
        ...state,
        users: state.users.filter((i) => i.id !== action.user.id),
        modalContent: `${action.user.name} has been removed`,
        modalIsOpen: true,
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        modalIsOpen: false,
      };
  }
};

const UsersFromFormInputUseReducer = () => {
  const [name, setName] = useState('');
  const [state, dispatch] = useReducer(reducer, defaultState);
  const inputName = useRef(null);
  useEffect(() => {
    inputName.current.focus();
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      const user = { id: Date.now(), name };
      dispatch({ type: 'ADD_USER', user });
      setName('');
    } else {
      dispatch({ type: 'EMPTY_VALUE' });
    }
  };
  const handleRemoveUser = (user) => {
    dispatch({ type: 'REMOVE_USER', user });
  };
  const closeModal = () => dispatch({ type: 'CLOSE_MODAL' });
  return (
    <div className='w-4/5 mx-auto mt-8 p-4 bg-gray-300 rounded shadow-xl'>
      <div className='flex gap-4'>
        <form className={boxStyles} onSubmit={handleSubmit}>
          <div className='mb-4 flex'>
            <label htmlFor='firstName'>Name: </label>
            <input
              ref={inputName}
              type='text'
              id='firstName'
              name='firstName'
              className='rounded w-full ml-2'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <button type='submit' className={buttonStyles}>
            Add User
          </button>
        </form>
        {state.modalIsOpen && (
          <Modal modalContent={state.modalContent} closeModal={closeModal} />
        )}
      </div>
      <div className='mt-8 p-4 bg-blue-300 rounded w-4/5 mx-auto'>
        {state.users.length ? (
          <ul className='flex flex-col gap-4'>
            {state.users.map((user) => (
              <li
                key={user.id}
                className='flex justify-between items-center bg-yellow-300 p-1 rounded'
              >
                <h4 className='text-2xl'>{user.name}</h4>
                <button
                  onClick={() => handleRemoveUser(user)}
                  className={buttonStyles}
                >
                  Remove User
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Users List is Empty</p>
        )}
      </div>
    </div>
  );
};

const Modal = ({ modalContent, closeModal }) => {
  useEffect(() => {
    setTimeout(() => {
      closeModal();
    }, 3000);
  });
  return (
    <div className={`${boxStyles} flex justify-center items-center`}>
      <h2 className='text-2xl'>{modalContent}</h2>
    </div>
  );
};

export default UsersFromFormInputUseReducer;
