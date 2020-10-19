import React, { useState, useEffect } from 'react';
import '../assets/slider.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const SliderUseEffect = () => {
  const [items, setItems] = useState([]);
  const [index, setIndex] = useState(0);
  const fetchItems = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const resData = await res.json();
    // const slicedData = resData.slice(0, 5);
    setItems(resData);
  };
  useEffect(() => {
    fetchItems();
  }, []);
  useEffect(() => {
    const last = items.length - 1;
    if (index < 0) setIndex(last);
    if (index > last) setIndex(0);
  }, [index, items]);
  // Auto Play
  useEffect(() => {
    const myInterval = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 5000);
    return () => clearInterval(myInterval);
  });
  return (
    <main className='mx-auto my-10 w-4/5'>
      <div className='text-center text-4xl mb-8'>
        <h2>Slider</h2>
      </div>
      <div className='SLIDER slider-container'>
        {items.map((person, personIndex) => {
          const {
            id,
            name,
            email,
            website,
            phone,
            address: { city, street },
          } = person;
          let position = 'nextSlide';
          if (personIndex === index) {
            position = 'activeSlide';
          }
          if (
            personIndex === index - 1 ||
            (index === 0 && personIndex === items.length - 1)
          ) {
            position = 'lastSlide';
          }
          return (
            <article
              key={id}
              className={`SLIDER slide ${position} bg-gray-200`}
            >
              <div className='SLIDER slideInner rounded border-2 border-black px-4 py-8 flex flex-col justify-between'>
                <h1>Name : {name}</h1>
                <p>Email : {email}</p>
                <p>Website: {website}</p>
                <p>Phone : {phone}</p>
                <p className='flex justify-between'>
                  <span>City : {city}</span>
                  <span>Street : {street}</span>
                </p>
              </div>
            </article>
          );
        })}
        <button
          onClick={() => setIndex((prev) => prev - 1)}
          className='SLIDER prev border border-black rounded'
        >
          <FaArrowLeft />
        </button>
        <button
          onClick={() => setIndex((prev) => prev + 1)}
          className='SLIDER next border border-black rounded'
        >
          <FaArrowRight />
        </button>
      </div>
    </main>
  );
};

export default SliderUseEffect;
