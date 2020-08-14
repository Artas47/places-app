import React from 'react';
import UsersList from '../components/users-list/users-list';

const Users = () => {
  const usersDummyData = [
    {
      id: 'u1',
      name: 'John Dick',
      interests: ['Photography', 'Design', 'Music'],
      following: 234,
      followers: 152,
      likes: 612,
    },
  ];
  return (
    <>
      <UsersList items={usersDummyData} />
    </>
  );
};

export default Users;
