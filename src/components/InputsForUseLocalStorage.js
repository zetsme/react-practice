import React, { useState } from 'react';
import useLocalStorage from './useLocalStorage';

const toCapitalize = (string) =>
  string && string.charAt(0).toUpperCase() + string.slice(1);

const InputsForUseLocalStorage = () => {
  const [input, setInput] = useState('');
  const {
    locals: name,
    addToLocal: addName,
    clearLocal: removeAllNames,
  } = useLocalStorage('name', input, setInput);
  //
  const [inputColors, setInputColors] = useState('');
  const {
    locals: colors,
    addToLocal: addColorsToLocal,
    clearLocal: removeAllColors,
  } = useLocalStorage('colors', inputColors, setInputColors);

  const customStyles = {
    h3: 'text-2xl font-bold mb-4 underline',
    input: 'px-2 py-1 rounded border-black border mr-4',
    buttonAdd: 'px-2 py-1 bg-teal-700 text-white rounded',
    box: ' bg-teal-300 p-4 rounded shadow-lg',
    buttonRemove: 'bg-red-500 px-2 py-1 rounded text-white mt-4',
  };

  return (
    <div className='p-4 inline-flex flex-col gap-4'>
      <div className={customStyles.box}>
        <input
          className={customStyles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type='text'
        />
        <button onClick={addName} className={customStyles.buttonAdd}>
          Click Me
        </button>
        <h3 className={customStyles.h3}>Names</h3>
        {name ? (
          name.map((i, idx) => <p key={idx}>{toCapitalize(i)}</p>)
        ) : (
          <p>Is Empty</p>
        )}
        <button className={customStyles.buttonRemove} onClick={removeAllNames}>
          Remove All Names
        </button>
      </div>
      <div className={customStyles.box}>
        <input
          className={customStyles.input}
          value={inputColors}
          onChange={(e) => setInputColors(e.target.value)}
          type='text'
        />
        <button onClick={addColorsToLocal} className={customStyles.buttonAdd}>
          Click Me
        </button>
        <h3 className={customStyles.h3}>Colors</h3>
        {colors && colors.map((i, idx) => <p key={idx}>{toCapitalize(i)}</p>)}
        <button className={customStyles.buttonRemove} onClick={removeAllColors}>
          Remove All Colors
        </button>
      </div>
    </div>
  );
};

export default InputsForUseLocalStorage;
