import React, { useReducer } from 'react';

const defaultState = {
  value: 0,
  op: '',
  num1: 0,
  num2: '',
  num3: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'OPERATION':
      if (!state.num1) {
        return { ...state, num1: state.num2, op: action.payload, num2: '' };
      }
      if (!state.num2) {
        return { ...state, op: action.payload };
      }
      if (state.num1 && state.op) {
        return {
          ...state,
          value: eval(state.value + state.op + state.num2),
          op: action.payload,
        };
      }
      return {
        ...state,
        value: eval(state.num1 + state.op + state.num2),
        num2: '',
        op: action.payload,
        num1: eval(state.num1 + state.op + state.num2),
      };
    case 'NUMBER':
      if (state.num2 === '' && action.payload === '.') {
        return { ...state, num2: '0' + action.payload };
      } else if (state.num2 === '') {
        return { ...state, num2: action.payload };
      } else {
        if (action.payload === '.' && state.num2.includes('.')) {
          return state;
        } else {
          return { ...state, num2: state.num2 + action.payload };
        }
      }
    case 'AC':
      return {
        value: 0,
        op: '',
        num1: 0,
        num2: '',
      };
    case 'C':
      if (state.num2.length === 2 && state.num2.includes('0.')) {
        return { ...state, num2: '' };
      } else if (state.num2.length > 1) {
        return { ...state, num2: state.num2.slice(0, -1) };
      } else {
        return { ...state, num2: '' };
      }
    case 'EQUAL':
      if (state.op && state.num2) {
        return {
          ...state,
          value: eval(state.num1 + state.op + state.num2),
          num2: '',
          num1: eval(state.num1 + state.op + state.num2),
          num3: state.num2,
        };
      } else if (state.op && state.value) {
        return { ...state, value: eval(state.value + state.op + state.num3) };
      } else {
        return state;
      }
    default:
      return state;
  }
};

const buttonStyle = 'rounded bg-gray-200 border border-black shadow text-2xl';

const CalculatorUseReducer = () => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  return (
    <div className='bg-orange-200 absolute w-full h-full flex items-center justify-center'>
      <div className='bg-gray-700 w-4/5 rounded shadow-2xl grid grid-cols-4 grid-rows-6 gap-2 p-4'>
        {/* display */}
        <div className='col-span-4 rounded bg-orange-400 flex items-center px-4 text-2xl'>
          {!state.num2 ? state.value : state.num2}
        </div>
        {/* buttons */}
        <button
          className={`${buttonStyle} row-start-6 col-start-2 col-span-2`}
          onClick={() => dispatch({ type: 'NUMBER', payload: '0' })}
        >
          0
        </button>
        <button
          className={buttonStyle}
          onClick={() => dispatch({ type: 'NUMBER', payload: '1' })}
        >
          1
        </button>
        <button
          className={buttonStyle}
          onClick={() => dispatch({ type: 'NUMBER', payload: '2' })}
        >
          2
        </button>
        <button
          className={buttonStyle}
          onClick={() => dispatch({ type: 'NUMBER', payload: '3' })}
        >
          3
        </button>
        <button
          className={buttonStyle}
          onClick={() => dispatch({ type: 'NUMBER', payload: '4' })}
        >
          4
        </button>
        <button
          className={buttonStyle}
          onClick={() => dispatch({ type: 'NUMBER', payload: '5' })}
        >
          5
        </button>
        <button
          className={buttonStyle}
          onClick={() => dispatch({ type: 'NUMBER', payload: '6' })}
        >
          6
        </button>
        <button
          className={buttonStyle}
          onClick={() => dispatch({ type: 'NUMBER', payload: '7' })}
        >
          7
        </button>
        <button
          className={buttonStyle}
          onClick={() => dispatch({ type: 'NUMBER', payload: '8' })}
        >
          8
        </button>
        <button
          className={buttonStyle}
          onClick={() => dispatch({ type: 'NUMBER', payload: '9' })}
        >
          9
        </button>
        <button
          className={`${buttonStyle} col-start-3 row-start-2`}
          onClick={() => dispatch({ type: 'OPERATION', payload: '*' })}
        >
          *
        </button>
        <button
          className={`${buttonStyle} col-start-4 row-start-2`}
          onClick={() => dispatch({ type: 'OPERATION', payload: '/' })}
        >
          /
        </button>
        <button
          className={`${buttonStyle} col-start-4 row-start-3`}
          onClick={() => dispatch({ type: 'OPERATION', payload: '+' })}
        >
          +
        </button>
        <button
          className={`${buttonStyle} col-start-4 row-start-4`}
          onClick={() => dispatch({ type: 'OPERATION', payload: '-' })}
        >
          -
        </button>
        <button
          className={`${buttonStyle} col-start-1 row-start-2`}
          onClick={() => dispatch({ type: 'AC' })}
        >
          AC
        </button>
        <button
          className={`${buttonStyle} col-start-2 row-start-2`}
          onClick={() => dispatch({ type: 'C' })}
        >
          C
        </button>
        <button
          className={buttonStyle}
          onClick={() => dispatch({ type: 'NUMBER', payload: '.' })}
        >
          .
        </button>
        <button
          className={`${buttonStyle} row-start-5 row-span-2 col-start-4 bg-orange-400`}
          onClick={() => dispatch({ type: 'EQUAL' })}
        >
          =
        </button>
      </div>
    </div>
  );
};

export default CalculatorUseReducer;
