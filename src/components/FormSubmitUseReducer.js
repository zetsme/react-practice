import React, { useReducer } from 'react';

const actions = {
  nameChanged: 'NAME_CHANGED',
  emailChanged: 'EMAIL_CHANGED',
  formSubmitted: 'FORM_SUBMITED',
};

const defaultState = {
  name: '',
  email: '',
  nameError: null,
  emailError: null,
  formCompleted: false,
  formSubmitted: false,
};

const reducer = (state, action) => {
  let error;
  switch (action.type) {
    case actions.nameChanged:
      error = validate('name', action.payload);
      return { ...state, name: action.payload, nameError: error };
    case actions.emailChanged:
      error = validate('email', action.payload);
      return { ...state, email: action.payload, emailError: error };
    case actions.formSubmitted:
      // form has been successfully submitted, stop from re-submissions
      if (state.formCompleted) return state;
      let formValid = true;
      // values are missing or with errors
      if (state.nameError || !state.name || state.emailError || !state.email) {
        formValid = false;
      }
      //
      if (state.formSubmitted) {
        return { ...state, formCompleted: formValid };
      }
      // empty values
      let nameError = validate('name', state.name);
      let emailError = validate('email', state.email);
      return {
        ...state,
        nameError,
        emailError,
        formSubmitted: true,
        formCompleted: formValid,
      };
    default:
      return state;
  }
};

const validate = (name, value) => {
  if (typeof value === 'string') value = value.trim();
  switch (name) {
    case 'name':
      if (value.length === 0) {
        return 'Must enter name';
      } else if (value.split(' ').length < 2) {
        return 'Must enter first and last name';
      } else {
        return null;
      }
      break;
    case 'email':
      if (value.length === 0) {
        return 'Must enter email';
      } else if (
        !value.includes('@') ||
        !value.includes('.') ||
        value.split('.')[1].length < 2
      ) {
        return 'Must enter valid email';
      } else {
        return null;
      }
      break;
  }
};

const FormSubmitUseReducer = () => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  //
  const handleChange = (e) => {
    dispatch({
      type: actions[e.target.name + 'Changed'],
      payload: e.target.value,
    });
  };
  //
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: actions.formSubmitted });
  };
  //
  const inputStyle = (hasError) => {
    return {
      border: hasError && state.formSubmitted ? '2px solid red' : 'none',
    };
  };
  const customStyles = {
    formControl: 'flex items-center mb-4',
    formInput: 'bg-gray-400 ml-4 rounded px-2 py-1',
    formError: 'ml-auto text-red-600',
  };
  return (
    <div className='bg-gray-300 absolute flex items-center justify-center w-full h-full'>
      <form
        onSubmit={handleSubmit}
        style={{ width: '500px' }}
        className='bg-white p-4 rounded shadow-2xl'
      >
        <div className={customStyles.formControl}>
          <label htmlFor='name'>Name: </label>
          <input
            className={customStyles.formInput}
            style={inputStyle(state.nameError)}
            id='name'
            name='name'
            value={state.name}
            onChange={handleChange}
            type='text'
          />
          <span className={customStyles.formError}>
            {state.formSubmitted && state.nameError}
          </span>
        </div>
        <div className={customStyles.formControl}>
          <label htmlFor='email'> Email: </label>
          <input
            className={customStyles.formInput}
            style={inputStyle(state.emailError)}
            id='email'
            name='email'
            value={state.email}
            onChange={handleChange}
            type='text'
          />
          <span className={customStyles.formError}>
            {state.formSubmitted && state.emailError}
          </span>
        </div>
        <p className='mb-4'>
          {state.formCompleted && 'Form Submitted Succesfully'}
        </p>
        <button
          className='rounded shadow-xl py-1 px-2 border-gray-300 border-2'
          type='submit'
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormSubmitUseReducer;
