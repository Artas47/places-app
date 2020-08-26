import React, { useEffect, useState } from 'react';
import UsersList from '../components/users-list/users-list';
import { useHttpClient } from '../../shared/hooks/http-hook';

const Users = () => {
  const [users, setUsers] = useState([]);
  const { sendRequest, isLoading, error } = useHttpClient();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          'http://localhost:5000/api/users',
          'GET'
        );
        setUsers(responseData.users);
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest]);

  if (!users.length) {
    return 'no users';
  }
  if (isLoading) {
    return 'SPINNER';
  }
  return <>{<UsersList items={users} />}</>;
};

export default Users;
