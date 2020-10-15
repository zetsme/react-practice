import React from 'react';
import useLocalStorage from './useLocalStorage';

const cStyles = {
  h3: 'text-2xl font-bold mb-4 underline',
  input: 'px-2 py-1 rounded border-black border mr-4',
  buttonAdd: 'px-2 py-1 bg-teal-700 text-white rounded',
  box: ' bg-teal-300 p-4 rounded shadow-lg',
  buttonRemove: 'bg-red-500 px-2 py-1 rounded text-white mt-4',
};
const InputsForUseLocalStorage = () => {
  const [value, setValue] = useLocalStorage('name', '');

  return (
    <div className='p-4 inline-flex flex-col gap-4'>
      <InputBox value={value} setValue={setValue} name='Names' />
    </div>
  );
};

const InputBox = (props) => {
  const { value, setValue, name } = props;
  const removeItem = () => setValue('');
  return (
    <div className={cStyles.box}>
      <h3 className={cStyles.h3}>{name}</h3>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={cStyles.input}
        type='text'
      />
      <button onClick={removeItem} className={cStyles.buttonRemove}>
        Remove
      </button>
    </div>
  );
};

export default InputsForUseLocalStorage;
