import React, { useMemo, useState } from 'react';

const Post = () => {
  const [groupFilter, setGroupFilter] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const useList = useMemo(() => {
    const tmp = [
      { id: 1, name: 'A', des: 'ADes', group: '1A' },
      { id: 2, name: 'B', des: 'BDes', group: '1A' },
      { id: 3, name: 'C', des: 'CDes', group: '1A' },
      { id: 4, name: 'D', des: 'DDes', group: '2A' },
      { id: 5, name: 'E', des: 'EDes', group: '2A' },
      { id: 6, name: 'F', des: 'FDes', group: '3A' },
      { id: 7, name: 'G', des: 'GDes', group: '3A' },
    ];
    return tmp.reduce((prev, curr) => {
      if (curr.name.includes(nameFilter) && curr.group.includes(groupFilter)) {
        prev.push(curr);
      }
      return prev;
    }, []);
  }, [nameFilter, groupFilter]);

  const groupOptions = ['1A', '2A', '3A'];

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <input
          value={nameFilter}
          onChange={(e) => {
            setNameFilter(e.target.value);
          }}
        />
        <select
          value={groupFilter}
          onChange={(e) => {
            setGroupFilter(e.target.value);
          }}
        >
          <option value={''}>All</option>
          {groupOptions.map((group, index) => (
            <option key={index + 'fei'}>{group}</option>
          ))}
        </select>
        <button
          onClick={() => {
            setGroupFilter('');
            setNameFilter('');
          }}
        >
          Reset
        </button>
      </div>
      <table>
        <thead>
          <th>id</th>
          <th>name</th>
          <th>des</th>
          <th>group</th>
        </thead>
        <tbody>
          {useList.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.des}</td>
              <td>{user.group}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Post;
