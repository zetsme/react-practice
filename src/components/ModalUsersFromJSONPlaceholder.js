import React, {
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { useFetch } from './useFetch';
import ReactDOM from 'react-dom';

const ModalUsersFromJSONPlaceholde = () => {
  const { fetchedData: users } = useFetch(
    'https://jsonplaceholder.typicode.com/users'
  );
  return (
    <div className='w-10/12 mx-auto my-8 bg-gray-900 p-4 shadow'>
      <ul className='grid grid-cols-2 gap-4'>
        {users.map((user) => {
          return <User key={user.id} user={user} />;
        })}
      </ul>
    </div>
  );
};

const User = (props) => {
  const { user } = props;
  const modalRef = useRef();
  const openModal = () => {
    modalRef.current.openModal();
  };
  return (
    <li className='bg-gray-700 rounded shadow text-white p-2 flex flex-col'>
      <article>
        <h4>{user.name}</h4>
        <p>{user.email}</p>
        <p>{user.website}</p>
      </article>
      <button
        className='ml-auto px-2 bg-gray-500 rounded text-black'
        onClick={openModal}
      >
        Details
      </button>
      <Modal user={user} ref={modalRef} />
    </li>
  );
};

const Modal = forwardRef((props, ref) => {
  const [display, setDisplay] = useState(false);
  useImperativeHandle(ref, () => {
    return {
      openModal: () => open(),
    };
  });
  const open = () => setDisplay(true);
  const close = () => setDisplay(false);
  const {
    user: { name, username, email, address, phone, website, company },
  } = props;
  if (display) {
    return ReactDOM.createPortal(
      <div className='fixed top-0 left-0 right-0 bottom-0'>
        <div
          onClick={close}
          className='fixed top-0 right-0 bottom-0 left-0 bg-black bg-opacity-50 z-10'
        ></div>
        <div className='relative top-1/2 left-1/2 w-3/5 bg-white p-12 z-50 min-h-2/5 max-w-4/5 overflow-y-auto -translate-x-1/2 -translate-y-1/2 transform'>
          <button
            onClick={close}
            className='absolute px-2 py-1 rounded bg-gray-700 top-0 right-0 mr-4 mt-4 text-white'
          >
            &times;
          </button>
          <article className='grid gap-4 text-lg'>
            <p>Name : {name}</p>
            <p>Username : {username}</p>
            <p>Email : {email}</p>
            <p>City : {address.city}</p>
            <p>Street : {address.street}</p>
            <p>Phone : {phone}</p>
            <p>Website : {website}</p>
            <p>Company : {company.name}</p>
          </article>
        </div>
      </div>,
      document.getElementById('root-modal')
    );
  }
  return null;
});

export default ModalUsersFromJSONPlaceholde;
