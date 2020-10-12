import React, { useState, useEffect, useMemo } from 'react';
const URL = 'https://jsonplaceholder.typicode.com/users';

const useSortData = (items, config = null) => {
  const [sortConfig, setSortConfig] = useState(config);

  const sortedItems = useMemo(() => {
    const sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = 'asc';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'asc'
    ) {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  return { items: sortedItems, requestSort };
};
//
const SortTable = () => {
  const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
    const res = await fetch(URL);
    const resData = await res.json();
    setUsers(resData);
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const { items, requestSort } = useSortData(
    users.map((i) => {
      const obj = {
        ...i,
        ...i.address,
      };
      delete obj.address;
      return obj;
    })
  );
  const cell = 'border px-4 py-1';
  return (
    <div className='absolute w-full h-full flex items-center justify-center bg-gray-400'>
      <div className='bg-white rounded p-4 shadow'>
        <table className='border-collapse'>
          <thead>
            <tr>
              <th className={cell} onClick={() => requestSort('username')}>
                Name
              </th>
              <th className={cell} onClick={() => requestSort('email')}>
                Email
              </th>
              <th className={cell} onClick={() => requestSort('city')}>
                City
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              return (
                <tr key={item.id}>
                  <td className={cell}>{item.username}</td>
                  <td className={cell}>{item.email}</td>
                  <td className={cell}>{item.city}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SortTable;
