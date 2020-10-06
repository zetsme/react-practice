import React, { useReducer } from 'react';

const defaultState = {
  additionalPrice: 0,
  car: {
    price: 29420,
    name: '2016 Mustang GT',
    image:
      'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
    features: [],
  },
  store: [
    { id: 1, name: 'Some Engine', price: 1500 },
    { id: 2, name: 'Details Package', price: 1400 },
    { id: 3, name: 'Sound System', price: 5200 },
    { id: 4, name: 'Spoiler', price: 300 },
  ],
};
const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        additionalPrice: state.additionalPrice + action.item.price,
        car: { ...state.car, features: [...state.car.features, action.item] },
        store: state.store.filter((i) => i.id !== action.item.id),
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        additionalPrice: state.additionalPrice - action.item.price,
        car: {
          ...state.car,
          features: state.car.features.filter((i) => i.id !== action.item.id),
        },
        store: [...state.store, action.item],
      };
    default:
      return state;
  }
};
const boxStyles = 'w-1/2 bg-white shadow p-4 shadow-2xl rounded';
const buttonStyles = 'ml-4 bg-pink-300 rounded px-2 py-1';
const CarComponentsUseReducer = () => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const buyItem = (item) => dispatch({ type: 'ADD_ITEM', item });
  const removeItem = (item) => dispatch({ type: 'REMOVE_ITEM', item });
  return (
    <article className='p-4 flex items-center justify-center bg-gradient-to-br from-pink-300 to-purple-300 absolute w-full h-full'>
      {/* Car */}
      <div className='flex gap-4'>
        <div className={boxStyles}>
          <figure className='mb-4'>
            <img src={state.car.image} alt='' />
          </figure>
          <h2>{state.car.name}</h2>
          <p className='mb-4'>Amount : ${state.car.price}</p>
          {state.car.features.length ? (
            <ol type='1'>
              {state.car.features.map((item) => (
                <li key={item.id} className='flex justify-between mb-2'>
                  {item.name}
                  <button
                    className={buttonStyles}
                    onClick={() => removeItem(item)}
                  >
                    Remove Item
                  </button>
                </li>
              ))}
            </ol>
          ) : (
            <p>You can purchase features from store</p>
          )}
        </div>
        {/* Store Components */}
        <div className={boxStyles}>
          {/* Store Features */}
          <div>
            <h4 className='text-2xl mb-4'>Store</h4>
            {state.store.length ? (
              <ol type='1'>
                {state.store.map((item) => (
                  <li key={item.id} className='mb-2 flex justify-between'>
                    {item.name} - ${item.price}
                    <button
                      className={buttonStyles}
                      onClick={() => buyItem(item)}
                    >
                      {' '}
                      Buy Item
                    </button>
                  </li>
                ))}
              </ol>
            ) : (
              <p className='mb-4'>Store is Empty</p>
            )}
          </div>
          {/* Total Amount */}
          <div>
            <h4 className='text-2xl'>
              Total Amount: ${state.car.price + state.additionalPrice}
            </h4>
          </div>
        </div>
      </div>
    </article>
  );
};

export default CarComponentsUseReducer;
