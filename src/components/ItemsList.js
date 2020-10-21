import React, { useState, useEffect, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FaPlus, FaPen, FaTrash, FaTrashAlt, FaEdit } from 'react-icons/fa';
function checkLS(itemName) {
  return localStorage.getItem(itemName) === null
    ? []
    : JSON.parse(localStorage.getItem(itemName));
}

const initialState = {
  list: checkLS('list'),
  id: null,
  edit: false,
};
const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    case 'EDIT_ITEM':
      return {
        ...state,
        edit: true,
        id: action.payload,
      };
    case 'UPDATE_ITEM':
      return {
        ...state,
        edit: false,
        id: null,
        list: action.payload,
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        list: state.list.filter((i) => i.id !== action.payload),
      };
    case 'CLEAR_ALL':
      return {
        ...state,
        list: [],
      };
    default:
      return state;
  }
};

const ItemsList = () => {
  const [input, setInput] = useState('');
  const [state, dispatch] = useReducer(reducer, initialState);
  const [alert, setAlert] = useState({
    show: false,
    className: '',
    message: '',
  });
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(state.list));
  }, [state.list]);
  const addItem = () => {
    dispatch({ type: 'ADD_ITEM', payload: { text: input, id: uuidv4() } });
    checkAlert(true, 'text-green-500', 'Added new Item');
    setInput('');
  };
  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
    checkAlert(true, 'text-red-500', 'Item Removed');
  };
  const editItem = (id) => {
    dispatch({ type: 'EDIT_ITEM', payload: id });
    const temp = state.list.find((i) => i.id === id);
    setInput(temp.text);
  };
  const updateItem = () => {
    const temp = state.list.map((i) => {
      if (i.id === state.id) {
        return { ...i, text: input };
      }
      return i;
    });
    dispatch({ type: 'UPDATE_ITEM', payload: temp });
    setInput('');
    checkAlert(true, 'text-indigo-300', 'Item has been updated');
  };
  const clearAll = () => {
    dispatch({ type: 'CLEAR_ALL' });
    checkAlert(true, 'text-pink-500', 'All items had been removed');
  };
  const checkAlert = (show = false, className = '', message = '') =>
    setAlert({ show, className, message });
  useEffect(() => {
    const timer = setTimeout(() => {
      setAlert(false);
      return () => clearTimeout(timer);
    }, 3000);
  }, [state.list]);
  return (
    <main className='absolute w-full h-full'>
      <div className='container mx-auto my-20 relative border border-black rounded'>
        {alert.show && (
          <div
            className={`${alert.className} -mt-10 text-lg absolute top-0 right-0 left-0 text-center`}
          >
            {alert.message}
          </div>
        )}
        <div className='py-4 bg-gray-200'>
          <h1 className='text-center text-4xl'>Items List</h1>
          <div className='flex justify-center gap-4 w-3/5 mx-auto'>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type='text'
              className='border border-black rounded flex-1 px-2 py-2'
            />
            {state.edit ? (
              <button
                onClick={updateItem}
                className='border border-black rounded px-2 py-1 w-1/5 flex items-center justify-center gap-2'
              >
                <span>Update</span>
                <FaPen />
              </button>
            ) : (
              <button
                onClick={addItem}
                className='border border-black rounded px-2 py-1 w-1/5 flex items-center justify-center gap-2'
              >
                <span>Add</span>
                <FaPlus />
              </button>
            )}
          </div>
        </div>
        {state.list.length > 0 && (
          <section className='p-4'>
            <ul className='flex flex-col gap-4 mb-4'>
              {state.list.map((i) => {
                return (
                  <li
                    key={i.id}
                    className='flex items-center justify-between bg-gray-700 text-white px-4 py-2'
                  >
                    <p className='tracking-widest'>{i.text}</p>
                    <div className='flex gap-4'>
                      <button
                        className='flex gap-2 items-center px-2 py-1 rounded bg-green-500'
                        onClick={() => editItem(i.id)}
                      >
                        Edit <FaEdit />
                      </button>
                      <button
                        className='flex gap-2 items-center  px-2 py-1 rounded bg-red-500 '
                        onClick={() => removeItem(i.id)}
                      >
                        Remove
                        <FaTrashAlt />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
            <button
              className='px-2 py-1 border border-black rounded text-red-500 flex items-center gap-2'
              onClick={clearAll}
            >
              <span>Clear All</span>
              <FaTrash />
            </button>
          </section>
        )}
      </div>
    </main>
  );
};

export default ItemsList;
