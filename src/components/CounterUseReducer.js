import React, { useReducer } from 'react';
const defaultState = { count: 0 };
const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
};

const CounterUseReducer = () => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const handleInс = () => {
    dispatch({ type: 'INCREMENT' });
  };
  const handleDec = () => {
    dispatch({ type: 'DECREMENT' });
  };
  return (
    <div className='w-full h-full bg-red-300 absolute flex items-center justify-center'>
      <div className='bg-blue-200 border border-blue-400 p-8 rounded w-1/2'>
        <h1 className='text-center text-2xl pb-2 border-b border-blue-400 mb-4'>
          Counter
        </h1>
        <div>
          <h2 className='mb-4'>Count : {state.count}</h2>
          <button
            onClick={handleInс}
            className='px-2 py-1 rounded w-8 border border-blue-400 mr-2'
          >
            +
          </button>
          <button
            onClick={handleDec}
            className='px-2 py-1 rounded w-8 border border-blue-400'
          >
            -
          </button>
        </div>
      </div>
    </div>
  );
};

export default CounterUseReducer;
